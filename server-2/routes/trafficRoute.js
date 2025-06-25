const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');
const pool = require('../db');

// Helper to convert UTC to ISO string in IST
function toISTISOString(utcString) {
  const istDate = new Date(
    new Date(utcString).toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  return istDate.toISOString(); // PostgreSQL-friendly
}

//Add log-data
router.post('/logs' , async (req,res)=>{
      console.log("agaya mei")
     try {
        const rawLogs = req.body;
        var api_key = req.headers['x-api-secret'];
           
          const { rows } = await pool.query('SELECT id FROM apis WHERE api_key = $1', [api_key]);
       const api_id = rows[0]?.id;
        
        const enrichedLogs = rawLogs.map(log => {
          const geo = geoip.lookup(log.ip || '') || {};
          return {
            ...log,
            country: geo.country || null,
            city: geo.city || null,
                istTimestamp: toISTISOString(log.timestamp),   
          };
        });
        
        // console.log(enrichedLogs)
        
        const values = enrichedLogs.map(log => [
          api_id,
          "example@gmail.com",
                 log.istTimestamp, // IST ISO format
          log.method,
          log.statusCode,
          log.ip,
          log.country,
          log.city,
          log.endpoint,
        ]);

   console.log(values)

  await pool.query(
    `INSERT INTO logs (api_id, user_email , timestamp, method, response_code, ip_address, country, city, endpoint)
     VALUES ${values.map((_, i) => `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`).join(', ')}
    `,
    values.flat()
  );

  res.status(201).json({ message: 'Logs received and stored' });

   
        
     } catch (err) {
        res.status(200).json({message:'error during logs receive and store'});
        // console.log(err,"coudnt save user")
        console.log(err)
     } finally {
    client.release(); // ✅ Always release the client
  }

})

module.exports = router;
