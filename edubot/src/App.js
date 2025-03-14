import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
import UploadDownload from "./components/UploadDownlaod"; // Fixed typo
import QAList from "./components/QAList";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import AppTheme from "./theme/AppTheme";
import ColorModeSelect from "./theme/ColorModeSelect";
import Back from "./assets/back.jpg"; 
import HomePage from "./components/HomePage"; 
import QpBot from "./pages/QpBot";
import DoubtBot from "./pages/DoubtBot";
import GeneralBot from "./pages/GeneralBot";  
import Dashboard from "./pages/Dashboard";
import SignInSide from "./pages/SignInSide";  
import SignUp from "./pages/SignUp"; 
import ProtectedRoute  from "./components/ProtectedRoute";

const Evaluation = () => <Typography variant="h4">Evaluation Page</Typography>;
const NotFound = () => <Typography variant="h4">404 - Page Not Found</Typography>;

const App = (props) => {
  return (
    <Router>
      <Navbar />
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

        {/* Full Height & Width */}
        <Stack
          direction="column"
          component="main"
          sx={{
            height: "100vh",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            padding: 3,
            paddingTop: "80px",
            backgroundImage: `url(${Back})`,
            // Educational Background
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat", // Prevents content from going behind Navbar
          }}
        >
          {/* Content Wrapper */}
          <Stack
            direction="column"
            sx={{
              width: "100%",
              maxWidth: "1200px",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/login" element={<SignInSide />} />
  <Route path="/register" element={<SignUp />} />

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/qp-generator" element={<QpBot />} />
    <Route path="/doubt-solver" element={<DoubtBot />} />
    <Route path="/general-bot" element={<GeneralBot />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/evaluation" element={<Evaluation />} />
  </Route>

  <Route path="*" element={<NotFound />} />
</Routes>

          </Stack>
        </Stack>
      </AppTheme>
    </Router>
  );
};

export default App;
