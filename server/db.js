const { config } = require("dotenv");
const { Pool } = require("pg");
require("dotenv").config();
config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Connect to the database with error handling
pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err.message);
    process.exit(1); // Exit the application on connection error
  });

const createTablesQuery = `
CREATE TABLE IF NOT EXISTS user_data (
  id serial primary key,
  email text,
  password text,
  username text
);

CREATE TABLE IF NOT EXISTS trains (
  tid serial primary key,
  trainnumber text,
  source text,
  destination text,
  departuretime text,
  arrivaltime text,
  stops text[],
  date date
);

CREATE TABLE IF NOT EXISTS book (
  username text,
  tid integer,
  bookid integer primary key
);
`;

pool.query(createTablesQuery)
  .then(() => {
    console.log("Tables successfully created or already exist.");
  })
  .catch((err) => {
    console.error("Error creating tables:", err.message);
  });

module.exports = pool;
