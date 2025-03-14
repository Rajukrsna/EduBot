const express = require("express");
const Group = require("../models/Group");
const GroupChat = require("../models/GroupChat");
const User = require("../models/User");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const createAIUser = async () => {
  let aiUser = await User.findOne({ name: "AI" });
  if (!aiUser) {
    aiUser = new User({ name: "AI", email: "ai@bot.com", password: "securepassword" });
    await aiUser.save();
  }
  return aiUser._id;
};
// 📌 Create a new group

router.post("/create", async (req, res) => {
  try {
    const { name, participantNames, creatorId } = req.body; // Get participant names & creator ID
    //console.log("hey,", name, participantNames, creatorId)  
    if (!name || !participantNames.length) {
      return res.status(400).json({ error: "Group name and participants required" });
    }

    // Find users by usernames
    const users = await User.find({ name: { $in: participantNames } });
    //console.log("found users, ", users) 
    const userIds = users.map(user => user._id.toString());

    // Include creator's ID in the group
    if (!userIds.includes(creatorId)) {
      userIds.push(creatorId);
    }

    if (userIds.length < 2) {
      return res.status(400).json({ error: "A group must have at least 2 users" });
    }

    const newGroup = new Group({ name, participants: userIds });
    //console.log("newGroupcreated", newGroup)  
    await newGroup.save();

    res.status(201).json({ message: "Group created!", group: newGroup });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📌 Fetch all groups user is part of
router.get("/my-groups/:userId", async (req, res) => {
  try {
    const groups = await Group.find({ participants: req.params.userId }).populate("participants", "name email");
    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups." });
  }
});

// 📌 Send a message in a group
router.post("/send", async (req, res) => {
  try {
    const { groupId,  text } = req.body;
    const userId = req.body.sender._id;
    console.log(userId)
    let aiResponse = null;
    const aiUserId = await createAIUser(); // Get AI User ID
    //console.log("userMessage , ", userId, text, groupId)
    // Save user message
    const newMessage = new GroupChat({ sender: userId, group: groupId, text: text });
    await newMessage.save();

    // Check if message mentions "@AI"
    if (text.includes("@AI")) {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Fetch previous messages from the group
      const chatHistory = await GroupChat.find({ group: groupId }).populate("sender", "name");
      const historyStr = chatHistory.map(msg => `${msg.sender.name}: ${msg.text}`).join("\n");

      const aiMessage = `Given this conversation:\n${historyStr}\n\nRespond to: "${text}"`;
      const response = await model.generateContent(aiMessage);
      aiResponse = response.response.candidates[0].content.parts[0].text;

      // Save AI response
      const aiUserId = await createAIUser(); // Get AI User ID
      const aiChat = new GroupChat({ sender: aiUserId, group: groupId, text: aiResponse });
            await aiChat.save();
    }

    res.json({ aiResponse,aiUserId  });
  } catch (error) {
    console.error("Error processing message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 📌 Get all messages for a group
router.get("/messages/:groupId", async (req, res) => {
  try {
    const messages = await GroupChat.find({ group: req.params.groupId }).populate("sender", "name _id");
   // console.log(messages)
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

module.exports = router;
