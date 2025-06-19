const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');
const db = require('../db');

//Add log-data
router.post('/logs' , async (req,res)=>{
      console.log("agaya mei")
     try {
        const rawLogs = req.body;
        var apiSecret = req.headers['x-api-secret'];
        //   if (secret !== YOUR_EXPECTED_SECRET) return res.status(403).send('Forbidden');
        
        const enrichedLogs = rawLogs.map(log => {
          const geo = geoip.lookup(log.ip || '') || {};
          return {
            ...log,
            country: geo.country || null,
            city: geo.city || null,
          };
        });
        
        // console.log(enrichedLogs)
        
        const values = enrichedLogs.map(log => [
          apiSecret,
          "example@gmail.com",
            new Date(log.timestamp).toISOString(),
          log.method,
          log.statusCode,
          log.ip,
          log.country,
          log.city,
          log.endpoint,
        ]);

   console.log(values)

  await db.query(
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
     }

})

module.exports = router;
