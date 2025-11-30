const { config } = require("dotenv");
const { Pool } = require("pg");
require("dotenv").config();
config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

// Connect to the database with error handling
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1);
  });

const createTablesQuery = `

CREATE TABLE IF NOT EXISTS user_data (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS trains (
  tid SERIAL PRIMARY KEY,
  trainnumber TEXT,
  source TEXT,
  destination TEXT,
  departuretime TEXT,
  arrivaltime TEXT,
  stops TEXT[],
  date DATE
);

-- FIXED BOOK TABLE WITH AUTO-INCREMENT bookid
CREATE TABLE IF NOT EXISTS book (
  bookid SERIAL PRIMARY KEY,
  username TEXT NOT NULL,
  tid INTEGER NOT NULL,
  date DATE
);

`;

pool
  .query(createTablesQuery)
  .then(() => {
    console.log("Tables successfully created or already exist.");
  })
  .catch((err) => {
    console.error("Error creating tables:", err.message);
  });

module.exports = pool;
