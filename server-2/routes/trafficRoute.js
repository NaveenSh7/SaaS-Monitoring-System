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

// Add log-data
router.post('/logs', async (req, res) => {
  console.log("agaya mei");
  const client = await pool.connect(); // ✅ use a dedicated client

  try {
    const rawLogs = req.body;
    const api_key = req.headers['x-api-secret'];

    // 🔁 Use client.query, not pool.query
    const { rows } = await client.query(
      'SELECT id FROM apis WHERE api_key = $1',
      [api_key]
    );
    const api_id = rows[0]?.id;

    if (!api_id) {
      return res.status(403).json({ message: "Invalid API key" });
    }

    const enrichedLogs = rawLogs.map(log => {
      const geo = geoip.lookup(log.ip || '') || {};
      return {
        ...log,
        country: geo.country || null,
        city: geo.city || null,
        istTimestamp: toISTISOString(log.timestamp),
      };
    });

    const values = enrichedLogs.map(log => [
      api_id,
      "example@gmail.com", // change to actual email if needed
      log.istTimestamp,
      log.method,
      log.statusCode,
      log.ip,
      log.country,
      log.city,
      log.endpoint,
    ]);

    const queryText = `
      INSERT INTO logs (api_id, user_email, timestamp, method, response_code, ip_address, country, city, endpoint)
      VALUES ${values.map((_, i) =>
        `($${i * 9 + 1}, $${i * 9 + 2}, $${i * 9 + 3}, $${i * 9 + 4}, $${i * 9 + 5}, $${i * 9 + 6}, $${i * 9 + 7}, $${i * 9 + 8}, $${i * 9 + 9})`
      ).join(', ')}
    `;

    await client.query(queryText, values.flat());

    res.status(201).json({ message: 'Logs received and stored' });

  } catch (err) {
    console.error("Error saving logs:", err);
    res.status(500).json({ message: 'Error during logs receive and store' });
  } finally {
    client.release(); // ✅ always release client
  }
});

module.exports = router;
