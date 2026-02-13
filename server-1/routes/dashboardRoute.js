const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/' , async (req,res)=>{
  try {
 
    const { api_id } = req.query;
      if (!api_id) return res.status(400).json({ error: 'api_id is required' });

    const totalReq = await db.query('SELECT COUNT(*) AS total FROM logs WHERE api_id = $1', [api_id]);
    const countries = await db.query('SELECT country, COUNT(*) FROM logs WHERE api_id = $1 GROUP BY country ORDER BY count DESC', [api_id]);
    const cities = await db.query('SELECT city, COUNT(*) FROM logs WHERE api_id = $1 GROUP BY city ORDER BY count DESC', [api_id]);
    const endpoints = await db.query('SELECT endpoint, COUNT(*) FROM logs WHERE api_id = $1 GROUP BY endpoint ORDER BY count DESC', [api_id]);
   
const timestamps = await db.query(
  'SELECT timestamp FROM logs WHERE api_id = $1 AND timestamp >= NOW() - INTERVAL \'7 days\' ORDER BY timestamp  DESC',
  [api_id]
);

    res.json({
      total_requests: parseInt(totalReq.rows[0].total),
      countries: countries.rows,
      cities: cities.rows,
      endpoints: endpoints.rows,
      timestamps : timestamps.rows
    });
    

  } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching dashboard data' });
  }
})


module.exports = router;
