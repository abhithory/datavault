import express from "express";
import cors from "cors";
import { config } from "dotenv";
config();

// Import Routes
import Routes from "./routes/index.js";

// Configuration
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());



// Routes
app.use("/api/v1",Routes);
app.use("/",(req,res) => {
  return res.status(200).json({
    "message":"working fine"
});
});

// Handle 404
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Requested resource not found" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
