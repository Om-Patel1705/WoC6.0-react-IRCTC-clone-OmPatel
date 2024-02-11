const express = require("express");
const pool = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign({ username }, "HELLOWORLD", { expiresIn: "10" });
    res.status(200).json({ success: true , token ,username});
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = md5(password);

  try {
    const result = await pool.query(
       "SELECT * FROM user_data WHERE username = $1",
       [username]

    );

    console.log(result.rows);
    if (result.rows[0].password === hashedPassword) {
      const token = jwt.sign({ username }, "HELLOWORLD", { expiresIn: "10" });
const email = result.rows[0].email;
      res
        .status(200)
        .json({ success: true, message: "Login successful", token, username , email});
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/search", async (req, res) => {
  var { source, destination, date } = req.body;
  var tdate;
  // if (date != null) tdate = date.substring(0, 10);
  tdate="2023-12-31";
  source = "Mumbai";
  destination="Delhi";

  try {
    console.log(tdate);
    const result = await pool.query(
      "SELECT * FROM trains WHERE source = $1 AND destination = $2 AND date = $3",
      [source, destination, tdate]
    );

    if (result.rows.length > 0) {
      const to = result.rows;
      console.log(result.rows);
      res.json({ data: to });
    } else {
      res.json({}); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/test", async (req, res) => {
  const result = await pool.query(
    "select * from trains join book on trains.tid=book.tid"
  );

  res.json(result.rows);
});

app.post("/book", async (req, res) => {
  const { tid, log ,date} = req.body;
  try {
    const tdate = date.substring(0, 10);
    console.log(log);
    console.log(tid);
    console.log(tdate);
    await pool.query("INSERT INTO book (username,tid,date) VALUES ($1, $2 , $3)", [log, tid , tdate]);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
  }
});

app.post("/booklist", async (req, res) => {
  const { username } = req.body;
   console.log(username);
  try {
    const result = await pool.query(
      `SELECT b.*,t.trainnumber,t.source,t.destination FROM book AS b JOIN trains AS t ON b.tid=t.tid WHERE b.username='${username}'`
    );
    if (result.rows.length > 0) {
      const to = result.rows;
      console.log(result.rows);
      res.json({ data: to });
    } else {
      res.json({});
    }
  } catch (err) {
   
    console.error(err);
  }
});
app.post("/cancel", async (req, res) => {
  const { username,tid } = req.body;
  
   

    try{
         await pool.query(`DELETE FROM book WHERE bookid=${tid}`);
        console.log(tid);

        const result = await pool.query(
          `SELECT b.*,t.trainnumber,t.source,t.destination FROM book AS b JOIN trains AS t ON b.tid=t.tid WHERE b.username='${username}'`

        );
        if (result.rows.length > 0) {
          const to = result.rows;
         
          res.json({ data: to });
        } else {
          res.json({});
        }

    }
    catch(err){
      console.log(err);

    }
});



app.listen(port, () => console.log(`Server running on port ${port}`));
