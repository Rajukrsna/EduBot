

import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon,
  Paper, TextField, Button, Box, Divider
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import ReactMarkdown from "react-markdown";  // ✅ Import markdown support

import axios from "axios";

const ChatbotUI = () => {
  const [sessionId, setSessionId] = useState(localStorage.getItem("sessionId") || uuidv4());

  const theme = useTheme();
  const [messages, setMessages] = useState([
    
    {
      text: "Greetings. Asking Doubts makes you great!. Are you ready?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/doubtBot/history")
      .then((response) => setHistory(response.data))
      .catch((error) => console.error("Error fetching history:", error));
  
    // Load existing session messages
    axios.get(`http://localhost:5000/doubtBot/chat/${sessionId}`)
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error loading chat:", error));
  }, [sessionId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages([...messages, newMessage]);

    try {
      const response = await axios.post("http://localhost:5000/doubtBot/chat", {  sessionId,message: input });
      console.log(response.data.answer)
      const botReply = { text: response.data.answer, sender: "bot" };
      console.log(botReply)
      setMessages([...messages, newMessage, botReply]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInput("");


  };
  const startNewChat = () => {
    const newSessionId = uuidv4();
    setSessionId(newSessionId);
    setMessages([]);
    localStorage.setItem("sessionId", newSessionId);
  };
  

  return (
    <Box sx={{ display: "flex", height: "100vh", marginTop: 4 }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: 280, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 280, boxSizing: "border-box", p: 2 } }}>
        <Button variant="contained" color="primary" onClick={startNewChat} startIcon={<AddIcon />} fullWidth sx={{ mb: 2 }}>New Chat</Button>
        
        <List>
  <Typography variant="subtitle2" sx={{ pl: 2, pb: 1, color: "gray" }}>
    Chat History
  </Typography>
  {history.map((chat, index) => (
    <ListItem button key={index} onClick={() => setSessionId(chat.sessionId)}>
      <ListItemIcon><ChatIcon color="primary" /></ListItemIcon>
      <ListItemText primary={`Chat ${index + 1} - ${new Date(chat.createdAt).toLocaleString()}`} />
    </ListItem>
  ))}
</List>
      </Drawer>

      {/* Chat Window */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <AppBar position="static">
          <Toolbar><Typography variant="h6" sx={{ flexGrow: 1 }}>Doubt-bot</Typography></Toolbar>
        </AppBar>

        {/* Chat Messages */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2, bgcolor: theme.palette.background.default }}>
          {messages.map((msg, index) => (
            <Paper key={index} sx={{
              p: 2, mb: 1, maxWidth: "70%",
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              bgcolor: msg.sender === "user" ? theme.palette.primary.light : theme.palette.grey[300]
            }}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>  {/* ✅ Render formatted text */}
            </Paper>
          ))}
        </Box>
        {/* Input Box */}
        <Box sx={{ display: "flex", p: 2, bgcolor: "background.paper" }}>
          <TextField fullWidth variant="outlined" placeholder="Type a message..." value={input} onChange={(e) => setInput(e.target.value)} />
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={sendMessage}><SendIcon /></Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatbotUI;

