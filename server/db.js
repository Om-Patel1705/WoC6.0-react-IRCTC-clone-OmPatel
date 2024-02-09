const { config } = require("dotenv");
const { Pool } = require("pg");
require('dotenv').config();
config();
const pool = new Pool({
    // user: "irctc_clone_6wlx_user",
    // password: "C6Q42Tb4raMjgwqttyTA51utyH7UUnQD",
    // database: "irctc_clone_6wlx",
    // host: "dpg-cn2hq7qcn0vc7390qdt0-a.oregon-postgres.render.com",
    // port: 5432

    connectionString: process.env.DATABASE_URL,
    ssl: true
});

// Connect to the database with error handling
pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(1); // Exit the application on connection error
  });

module.exports = pool;
