const express = require("express");

const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // Load environment variables

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Use Gemini API key
const Chat = require("../models/Chat");
  // Route to handle chatbot messages
  router.post("/chat", async (req, res) => {
    const {sessionId,message } = req.body;
    // Check if session exists
    let chatSession = await Chat.findOne({ sessionId });
  
    if (!chatSession) {
      chatSession = new Chat({ sessionId, messages: [] });
    }
  
    chatSession.messages.push({ text: message, sender: "user" });

    try {

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Analyze QP pattern using GPT-4
const patternResponse =  await model.generateContent(`You are a doubt solving chatbot. Solve any doubt the user asks: User doubt: ${message}`)
const answer = patternResponse.response.candidates[0].content.parts[0].text; 
console.log("THER PERTERE INS", answer)
      // Store chat in MongoDB
const botReply = { text: answer, sender: "bot" };
      chatSession.messages.push(botReply);

        await chatSession.save();   
  
      res.json({ answer });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Error fetching response from Gemini AI" });
    }
  });
  
  // Get chat history (sessions list)
router.get("/history", async (req, res) => {
    const sessions = await Chat.find({}, "sessionId createdAt").sort({ createdAt: -1 });
    res.json(sessions);
  });
  
  // Get chat messages by session ID
  router.get("/chat/:sessionId", async (req, res) => {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });
    res.json(chat ? chat.messages : []);
  });
  module.exports = router;