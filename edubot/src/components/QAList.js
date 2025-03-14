import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";
import bot from "../assets/bot1.png";  
const backendUrl = process.env.REACT_APP_BACKEND_URL;

const QAList = ({ syllabusText, previousQPText , onLinkData}) => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello 👋 Welcome to QP-Bot. What sort of Question papers you need today?" }
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newUserMessage = { type: "user", text: input };
    setMessages([...messages, newUserMessage]); // Update UI immediately
    setInput("");

    try {
      const response = await axios.post(`${backendUrl}/generatePdf/generate`, {
        difficulty: input,
        syllabusText,
        previousQPText
      });

      const botReply = { type: "bot", text: response.data.message };
      console.log(response.data)
      onLinkData(response.data.downloadLink)
      setMessages((prevMessages) => [...prevMessages, botReply]); // Append bot response
    } catch (error) {
      console.error("Error communicating with chatbot backend:", error);
      const errorMessage = { type: "bot", text: "Oops! Something went wrong. Please try again." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 500,
        borderRadius: 3,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        height: 500,
        marginTop: 2,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #187bcd, #4aa3df)",
          color: "white",
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={bot} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
             QP-Bot
            </Typography>
            <Typography variant="caption">Ready To Server You!</Typography>
          </Box>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton size="small" sx={{ color: "white" }}>
            <MoreVertIcon />
          </IconButton>
          <IconButton size="small" sx={{ color: "white" }}>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Stack>
      </Box>

      {/* Chat Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg, index) => (
          <Typography
            key={index}
            sx={{
              background: msg.type === "user" ? "#1976d2" : "#f1f1f1",
              color: msg.type === "user" ? "white" : "black",
              p: 1,
              borderRadius: 2,
              alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
              maxWidth: "75%",
            }}
          >
            {msg.text}
          </Typography>
        ))}
      </Box>

      {/* Input Field */}
      <Stack direction="row" alignItems="center" sx={{ p: 1, borderTop: "1px solid #ddd" }}>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <IconButton>
          <EmojiEmotionsIcon />
        </IconButton>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Enter your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default QAList;
