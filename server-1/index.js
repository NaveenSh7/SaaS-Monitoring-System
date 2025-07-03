const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const axios = require('axios');
const { getAllApis, createApi, getApi, updateApi } = require('./models/apiModel');
const {createUptime ,updateUptime,getUptime } = require('./models/uptimeModel');
const db = require('./db');
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
//socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🟢 Client connected:', socket.id);

  let intervalId = null;

  socket.on('GetDashboardData', async ({ selectedAPI }) => {
    console.log(`📡 GetDashboardData for API: ${selectedAPI.selectedAPI}`);
const api_id = Number(selectedAPI.selectedAPI);
    intervalId = setInterval(async () => {
      try {
        const hours = await db.query(
          `SELECT status, ROUND(SUM(EXTRACT(EPOCH FROM (COALESCE(ended_at, NOW()) - started_at)) / 3600), 2) AS total_hours 
           FROM uptimes 
           WHERE api_id = $1 
           GROUP BY status`,
          [api_id]
        );

        const status = await db.query(
          `SELECT status 
           FROM uptimes 
           WHERE api_id = $1 AND ended_at IS NULL 
           ORDER BY started_at DESC 
           LIMIT 1`,
          [api_id]
        );

        const latency = await db.query(
          `SELECT latency 
           FROM uptimes 
           WHERE api_id = $1 AND ended_at IS NULL 
           ORDER BY started_at DESC 
           LIMIT 1`,
          [api_id]
        );

        const totalReq = await db.query(
          `SELECT COUNT(*) AS total 
           FROM logs 
           WHERE api_id = $1`,
          [api_id]
        );

        const DashboardData = {
          StatusData: status.rows[0]?.status || 'unknown',
          HoursData: hours.rows, // [{ status: 'up', total_hours: 3.5 }, ...]
          LatencyData: parseFloat(latency.rows[0]?.latency || 0),
          TrafficData: parseInt(totalReq.rows[0]?.total || 0),
        };

        socket.emit('DashboardData', DashboardData);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err.message);
      }
    }, 5000);
  });

  socket.on('disconnectFromApi', ({ api_id }) => {
    clearInterval(intervalId);
    socket.leave(api_id);
    console.log(`❎ Unsubscribed from API: ${api_id}`);
  });

  socket.on('disconnect', () => {
    clearInterval(intervalId);
    console.log('🔌 Client disconnected:', socket.id);
  });
});



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

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
