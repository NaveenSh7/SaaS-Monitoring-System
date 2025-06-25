const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 5, // ✅ Set a safe pool size for Supabase Free/Pro tier
  idleTimeoutMillis: 30000, // Optional: close idle connections
  connectionTimeoutMillis: 4000 // Optional: fail if not connected in 2s
});

pool.on('connect', () => {
  console.log('✅ PostgreSQL connected with server-2');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error', err);
});

module.exports = pool;

