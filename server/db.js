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


try {
  const response = pool.query(`CREATE TABLE user_data(
	id serial primary key,
	email text,
	password text,
	username text
);

CREATE TABLE trains(
	tid serial primary key,
	trainnumber text,
	source text,
	destination text,
	departuretime text,
	arrivaltime text,
	stops text[],
	date date
);

CREATE TABLE book(
	username text,
	tid integer,
	bookid integer primary key
);`);

if(response.ok)console.log("Tables Successfully created.");
} catch (err) {
  console.log("Tables already exists.");
}

module.exports = pool;
