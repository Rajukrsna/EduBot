const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // User IDs
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "GroupChat" }], // Chat messages
});

module.exports = mongoose.model("Group", GroupSchema);
