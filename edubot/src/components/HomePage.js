import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, Grid } from "@mui/material";
import { School, Help, Chat } from "@mui/icons-material"; // Icons for representation
import { useState, useEffect } from "react";  
import axios from "axios"; // Import axios for API calls 
import {ReactComponent as Bot} from "../bot.svg"; // Import bot logo
const bots = [
  {
    title: "QP Generator Bot",
    description: "Generate question papers with ease using AI-driven templates.",
    icon: <School fontSize="large" />,
    route: "/qp-generator",
  },
  {
    title: "Doubt Solving Bot",
    description: "Get instant solutions to your academic queries.",
    icon: <Help fontSize="large" />,
    route: "/doubt-solver",
  },
  {
    title: "Collaborative Bot",
    description: "A chatbot for you and your friends to Group study with AI!.",
    icon: <Chat fontSize="large" />,
    route: "/general-bot",
  },
];

const Homepage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken"); 
        console.log(token)// Retrieve token
        if (!token) {
          navigate("/login"); // Redirect to login if no token
          return;
        }

        const response = await axios.get("http://localhost:5000/authRoute/me", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Fixed: Use "Bearer " prefix
        });

        setUsername(response.data.name);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login"); // Redirect if unauthorized
      }
    };

    fetchUserData();
  }, [navigate]);
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", backgroundColor: "#f9f9f9", padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Hi {username}! Choose Your Bot
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 4, maxWidth: "600px" }}>
        Select a chatbot based on your requirements and get started.
           {/* Logo & Branding */}
            <Bot style={{ width: 100, height: 45, color: "black" }} />
    

      </Typography>
      
      <Grid container spacing={3} justifyContent="center">
        {bots.map((bot, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: "center",
                padding: 3,
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "scale(1.05)" },
              }}
            >
              <Box sx={{ fontSize: 50, marginBottom: 1, color: "#1976d2" }}>
                {bot.icon}
              </Box>
              <CardContent>
                <Typography variant="h6">{bot.title}</Typography>
                <Typography variant="body2" sx={{ marginBottom: 2, color: "gray" }}>
                  {bot.description}
                </Typography>
                <Button variant="contained" onClick={() => navigate(bot.route)}>
                  Let's Begin
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};



export default Homepage;
