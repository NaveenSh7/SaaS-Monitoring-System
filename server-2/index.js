const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

require("dotenv").config();

const trafficRoute = require("./routes/trafficRoute");

const PORT = process.env.PORT || 5001;

// CORS Configuration - Use environment variable for security
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim()).filter(Boolean)
  : ["http://localhost:3000"];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api", trafficRoute);

// Health check endpoints
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "server-2" });
});

app.get("/", (req, res) => {
  res.send(" Server-2 Running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
