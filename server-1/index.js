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
const dashbaordRoutes = require('./routes/dashboardRoute');
const PORT = process.env.PORT || 5000;


// const Logger = require('saas-monitering-sdk');

// Logger.init({
//   secret: 'lodalasun',
// });
// app.use(Logger.middleware());


// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/users', userRoutes);
app.use('/api/apis', apiRoutes);
app.use('/api/uptime', uptimeRoutes);
app.use('/api/dashboard', dashbaordRoutes);

// Health check
app.get('/', (req, res) => {
  res.send(' Server-1 Running');
});

// function : check up or down => 
let isRunning = false;

const checkApis = async () => {
  if (isRunning) return; // skip this run
  isRunning = true;

  try {
    const apisResponse = await axios.get(`http://localhost:${PORT}/api/apis/all`);
    const apis = apisResponse.data;

    await Promise.all(
      apis.map(async (api) => {
        try {
          var start = Date.now();
          const response = await axios.get(api.url, { timeout: 4000 });
          const status = response.status === 200 ? 'up' : 'down';
          const latency = Date.now() - start;
          await axios.put(`http://localhost:${PORT}/api/uptime`, {
            api_id: api.id,
            status,
            latency
          });
        } catch (err) {
          const latency = Date.now() - start;
          await axios.put(`http://localhost:${PORT}/api/uptime`, {
            api_id: api.id,
            status: 'down',
            latency
          });
        }
      })
    );
  } catch (err) {
    console.error('Failed to check APIs:', err);
  } finally {
    isRunning = false;
  }
};


setInterval(checkApis, 15000); // run every 5 seconds

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
