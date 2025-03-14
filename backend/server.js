const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
dotenv.config();
connectDB();
const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });


app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true, // ✅ Allow cookies & authentication headers
    // Adjust if frontend is on a different port
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(express.json());

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User joined group: ${groupId}`);
    });
  
    socket.on("sendMessage", ({ groupId, message }) => {
      io.to(groupId).emit("receiveMessage", message);
    });
  
    socket.on("disconnect", () => console.log("User disconnected:", socket.id));
  });
  
app.use("/authRoute", require("./routes/authRoute"));
//app.use("/api/registration", require("./routes/registrationRoutes"));
app.use("/extractText", require("./routes/extractText"));   
app.use("/generatePdf", require("./routes/generatePdf"));   
app.use("/doubtBot", require("./routes/doubtBot")); 
app.use("/collaborative", require("./routes/collaborative"));   
app.listen(5000, () => console.log("Server running on port 5000"));
