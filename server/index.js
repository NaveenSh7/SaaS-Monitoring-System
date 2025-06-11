const express = require('express');
const cors = require('cors');
const app = express();
const axios = require('axios');
const { getAllApis, createApi, getApi, updateApi } = require('./models/apiModel');
const {createUptime ,updateUptime,getUptime } = require('./models/uptimeModel');

require('dotenv').config();

const userRoutes = require('./routes/userRoute');
const apiRoutes = require ('./routes/apiRoute');
const uptimeRoutes = require('./routes/uptimeRoute');
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/apis', apiRoutes);
app.use('/api/uptime', uptimeRoutes);

// Health check
app.get('/', (req, res) => {
  res.send(' API Running');
});

// function : check up or down => 
const checkApis = async () => {
  try {
    // call your own route `/api/apis` to get APIs
    const apisResponse = await axios.get(`http://localhost:${PORT}/api/apis/all`);
    const apis = apisResponse.data;

    await Promise.all(
      apis.map(async (api) => {
        try {
          var start = Date.now();
        
          const response = await axios.get(api.url, { timeout: 4000 });
  
          const status = response.status === 200 ? 'up' : 'down';
         const  latency = Date.now() - start; 
          // call your own route `/api/uptime` to update uptime status
          await axios.put(`http://localhost:${PORT}/api/uptime`, {
            api_id: api.id,
            status,
              latency:latency,
          });
        } catch (err) {
           const  latency = Date.now() - start; 
          await axios.put(`http://localhost:${PORT}/api/uptime`, {
            api_id: api.id,
            status: 'down',
            latency:latency,
          });
        }
      })
    );
  } catch (err) {
    console.error('Failed to check APIs:', err);
  }
};


setInterval(checkApis, 5000); // run every 5 seconds


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
