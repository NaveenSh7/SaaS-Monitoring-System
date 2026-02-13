const { Client } = require("pg");
const path = require("path");

// Load server-1/.env explicitly
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is not set in server-1/.env");
  process.exit(1);
}

const schemaSql = `
BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  services TEXT[] DEFAULT '{}',
  plan TEXT DEFAULT 'free',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS apis (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  api_type TEXT NOT NULL,
  plan TEXT NOT NULL,
  api_key TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS uptimes (
  id SERIAL PRIMARY KEY,
  api_id INTEGER NOT NULL REFERENCES apis(id) ON DELETE CASCADE,
  status TEXT,
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  latency INTEGER,
  email_sent BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS logs (
  id SERIAL PRIMARY KEY,
  api_id INTEGER NOT NULL REFERENCES apis(id) ON DELETE CASCADE,
  user_email TEXT,
  timestamp TIMESTAMP,
  method TEXT,
  response_code INTEGER,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  endpoint TEXT
);

COMMIT;
`;

async function main() {
  const client = new Client({
    connectionString,
    ssl: false,
  });

  try {
    await client.connect();
    await client.query(schemaSql);
    console.log("✅ Database schema initialized");
  } catch (err) {
    console.error("❌ Failed to initialize schema:", err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

main();
