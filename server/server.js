const express = require("express");
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const md5 = require("md5");

const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = md5(password);
    console.log("($1, $2, $3)", [username, email, hashedPassword]);
    await pool.query(
      "INSERT INTO user_data (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);
  console.log(req.body);

  try {
    const result = await pool.query(
      "SELECT * FROM user_data WHERE username = $1",
      [username]
    );

    if (result.rows[0].password === hashedPassword) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      console.log("YASH MC!");
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
