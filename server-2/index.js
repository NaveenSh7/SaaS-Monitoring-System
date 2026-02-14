const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");

require("dotenv").config();

const trafficRoute = require("./routes/trafficRoute");

const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: "*",
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
