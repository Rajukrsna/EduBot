const mongoose = require("mongoose");

const GroupChatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference user
  group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" }, // Reference group
  text: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("GroupChat", GroupChatSchema);
