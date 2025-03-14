const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  text: String,
  sender: String, // "user" or "bot"
  timestamp: { type: Date, default: Date.now },
});

const ChatSchema = new mongoose.Schema({
  sessionId: String, // Unique session ID for each chat
  messages: [MessageSchema], // Store all messages in an array
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
