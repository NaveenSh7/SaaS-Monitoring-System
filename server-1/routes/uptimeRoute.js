const express = require('express');
const router = express.Router();
const {createUptime ,updateUptime,getUptime } = require('../models/uptimeModel');
const moment = require('moment-timezone');
const db = require('../db');


//Add new uptime
router.post('/' , async (req,res)=>{
     try {
        const {api_id,status,started_at,ended_at,latency} = req.body;

            if (!api_id || !status || !started_at) {
      return res.status(400).json({ message: 'All fields required' });
    }
        const response = await createUptime(api_id,status,started_at,ended_at,latency);
        res.json(response);
        
     } catch (err) {
        res.status(500).json({message:'error posting new uptime'});
        console.log(err,"coudnt save uptime")
     }
})

// changing status and adding new uptime/downtime

router.put('/', async (req, res) => {
  const { api_id, status, latency } = req.body;
 console.log(api_id)
  try {
    // Step 1: Get the last record with ended_at IS NULL
   
    const current = await db.query(
      'SELECT * FROM uptimes WHERE api_id = $1 AND ended_at IS NULL ORDER BY started_at DESC LIMIT 1',
      [api_id]
    );

    const now = moment().tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');

    if (current.rows.length === 0) {
      // No previous open record → Insert new
      const inserted = await createUptime(api_id, status, latency);
      return res.status(200).json({ message: 'First record created', inserted });
    }

    const last = current.rows[0];

   if (last.status.toLowerCase() === status.toLowerCase()) {
      // Same status, just update latency if you want
      await db.query(
        'UPDATE uptimes SET latency = $1 WHERE id = $2',
        [latency, last.id]
      );
      return res.status(200).json({ message: 'Status unchanged' });
    }

    // Status changed → Close previous
    await updateUptime(last.id);

    // Create new record
    const inserted = await createUptime(api_id, status, latency);

    res.status(200).json({ message: 'Status changed, new row created', inserted });

  } catch (err) {
    console.error('aaFailed to update uptime:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get uptimes based on user

router.get('/' , async (req,res)=>{
  try {
 
    const {api_id } = req.query;
    
    const hours = await db.query(
        'SELECT status, ROUND(SUM(EXTRACT(EPOCH FROM (COALESCE(ended_at, NOW()) - started_at)) / 3600), 2)AS total_hours FROM uptimes WHERE api_id=$1 GROUP BY status',
        [api_id]
      );
    const status = await db.query(
      'SELECT status FROM uptimes WHERE api_id=$1 AND ended_at is NULL ORDER BY started_at DESC LIMIT 1',[api_id]
    );

    const timestamps = await db.query(`
      SELECT 
        status,
        started_at + INTERVAL '5 hours 30 minutes' as started_at,
        COALESCE(ended_at, NOW()) + INTERVAL '5 hours 30 minutes' as ended_at
      FROM uptimes 
      WHERE api_id = $1 
        AND COALESCE(ended_at, NOW()) >= NOW() - INTERVAL '7 days'
      ORDER BY COALESCE(ended_at, NOW()) DESC
    `, [api_id]);

    res.json({hours:hours.rows,status:status.rows,timestamps:timestamps.rows});

  } catch (error) {
        res.status(500).json({ message: 'Error fetching uptimes' });
  }
})


module.exports = router;