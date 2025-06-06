const express = require('express');
const cors = require('cors');
const app = express();


require('dotenv').config();

const userRoutes = require('./routes/userRoute');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/', (req, res) => {
  res.send(' API Running');
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
