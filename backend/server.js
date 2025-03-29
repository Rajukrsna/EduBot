const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
dotenv.config();
connectDB();
const http = require("http");



app.use(cors({
  origin: "*", // Allow all origins (Only for testing, not in production)
  credentials: true,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/authRoute", require("./routes/authRoute"));
//app.use("/api/registration", require("./routes/registrationRoutes"));
app.use("/extractText", require("./routes/extractText"));   
app.use("/generatePdf", require("./routes/generatePdf"));   
app.use("/doubtBot", require("./routes/doubtBot")); 
app.use("/collaborative", require("./routes/collaborative"));   
app.listen(5000, () => console.log("Server running on port 5000"));
