const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

client.connect()
  .then(() => console.log('✅ PostgreSQL connected with server-1'))
  .catch((err) => console.error('❌ Connection error:', err.stack));

module.exports = client;
