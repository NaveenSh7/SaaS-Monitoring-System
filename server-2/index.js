const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const db = require('./db');
require('dotenv').config();

const trafficRoute = require('./routes/trafficRoute')


const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api', trafficRoute);


// Health check
app.get('/', (req, res) => {
  res.send(' Server-2 Running');
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
