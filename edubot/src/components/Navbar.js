import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSelect from "../theme/ColorModeSelect";
import { DashboardIcon, LogoutIcon } from "../components/CustomIcons";
import { ReactComponent as SmartVerifyLogo } from "../logo.svg";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment"; // For Evaluation
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated ,setIsAuthenticated} = useContext(AuthContext);



  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppBar
      position="absolute"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Light transparent white
        backdropFilter: "blur(10px)", // Cool glass effect
        boxShadow: "none",
        paddingX: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Logo & Branding */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/" sx={{ p: 1 }}>
            <SmartVerifyLogo style={{ width: 100, height: 45, color: "black" }} />
          </IconButton>
        </Box>

        {/* Theme Toggle */}
        <ColorModeSelect />

        {/* Authentication Buttons */}
   {isAuthenticated ? (
          <Box sx={{ display: "flex", gap: 2 }}>
          <Button
              color="inherit"
              onClick={() => navigate("/")}
              startIcon={<HomeIcon />}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Home
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/dashboard")}
              startIcon={<DashboardIcon />}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/evaluation")}
              startIcon={< AssessmentIcon />}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Evaluation
            </Button>
            <Button
              color="inherit"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Logout
            </Button>
          </Box>
          ) : (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/register")}
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Register
            </Button>
          </Box>
        )}
       
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
