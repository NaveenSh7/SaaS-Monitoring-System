const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5, // Safe for Supabase Free tier
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  ssl: false,
});

pool.on('connect', () => {
  console.log('✅ Connected to Supabase via Session Pooler');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected PostgreSQL error', err);
});

module.exports = pool;
