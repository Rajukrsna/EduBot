import React, { useState, useEffect } from "react";
import {  Box, Button, List, ListItem, ListItemText, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


const ChatApp = () => {
  const [groups, setGroups] = useState([]); 
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [participants, setParticipants] = useState(""); // Comma-separated usernames
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  // Fetch user's groups on load
  useEffect(() => {
    if (!userId) return; // Ensure user is logged in
    axios.get(`${backendUrl}/collaborative/my-groups/${userId}`)
      .then(res => setGroups(res.data))
      .catch(err => console.error("Error fetching groups:", err));
  }, [userId]);

  // Fetch messages when a group is selected
  useEffect(() => {
    if (!selectedGroup) return;

    axios.get(`${backendUrl}/collaborative/messages/${selectedGroup}`)
      .then(res => setMessages(res.data))
      .catch(err => console.error("Error fetching messages:", err));

  }, [selectedGroup]);


  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedGroup) return;

    const messageData = {
      groupId: selectedGroup,
      sender: { _id: userId, name: name },
      text: newMessage,
      time: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, messageData]); // Keep user message
    setNewMessage("");


    try {
      const response = await axios.post(`${backendUrl}/collaborative/send`, messageData);
      if (response.data.aiResponse) {
        const aiMsg = {
          groupId: selectedGroup,
          sender: { _id: response.data.aiUserId , name: "AI" },
          text: response.data.aiResponse,
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const openGroupModal = () => setOpenModal(true);
  const closeModal = () => {
    setOpenModal(false);
    setParticipants("");
    setGroupName("");
  };

  const createGroup = () => {
    if (!groupName.trim() || !participants.trim()) return;

    const participantNames = participants.split(",").map((p) => p.trim());

    axios.post(`${backendUrl}/collaborative/create`, { 
      name: groupName, 
      participantNames, 
      creatorId: userId 
    })
    .then(res => {
      setGroups([...groups, res.data.group]);
      closeModal();
    })
    .catch(err => console.error("Error creating group:", err));
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#f8f9fa" sx={{ marginTop: 10 }}>
      {/* Sidebar - Groups */}
      <Box width="300px" bgcolor="white" boxShadow={2} p={2}>
        <Typography variant="h6">Your Groups</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mt: 2, mb: 2 }} onClick={openGroupModal}>
          Create Group
        </Button>
        <List>
          {groups.map((group, index) => (
            <ListItem key={index} button onClick={() => setSelectedGroup(group._id)}>
              <ListItemText primary={group.name} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Chat Section */}
      <Box flex={1} display="flex" flexDirection="column">
        <Box p={2} bgcolor="white" boxShadow={1}>
          <Typography variant="h6">{selectedGroup ? "Group Chat" : "Select a Group"}</Typography>
          <Typography variant="body2" color="textSecondary">Collaborate and ask AI for help using @AI</Typography>
        </Box>

        {/* Chat Messages */}
        <Box flex={1} p={2} overflow="auto">
          {messages.map((msg, index) => (
            <Paper
              key={index}
              sx={{
                p: 1.5,
                mb: 2,
                maxWidth: "60%",
                ml: msg.sender?._id === userId ? "auto" : 0,
                bgcolor: msg.sender?._id === userId ? blue[500] : "white",
                color: msg.sender?._id === userId ? "white" : "black",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <Typography variant="body2" fontWeight="bold">
                {msg.sender?.name || "Unknown"}
              </Typography>
              <Typography variant="body1">{msg.text}</Typography>
              <Typography variant="caption" display="block" textAlign="right">
                {msg.time}
              </Typography>
            </Paper>
          ))}
        </Box>
         {/* Message Input */}
         <Box display="flex" alignItems="center" p={2} bgcolor="white" boxShadow={1}>
          <TextField fullWidth variant="outlined" placeholder="Type a message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()} />
          <Button onClick={sendMessage} variant="contained" sx={{ ml: 1 }} color="primary">
            <SendIcon />
          </Button>
        </Box>

        {/* Group Creation Modal */}
        <Dialog open={openModal} onClose={closeModal}>
          <DialogTitle>Create New Group</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              variant="outlined"
              label="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Add Participants (comma-separated emails)"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </DialogContent >
          <DialogActions>
            <Button onClick={closeModal} color="secondary">Cancel</Button>
            <Button onClick={createGroup} color="primary">Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ChatApp;
