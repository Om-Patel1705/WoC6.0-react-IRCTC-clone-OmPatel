const express = require("express");
const pool=require("./db");
const cors = require("cors");
const bodyParser = require('body-parser');
const md5=require("md5")



const port = 8000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/signup',async(req,res)=>{
    const { username, email, password } = req.body;
    try{
        
        const hashedPassword = md5(password);
        console.log( "($1, $2, $3)", [username, email, hashedPassword]);
        await pool.query("INSERT INTO user_data (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);
        res.status(200).json({ success: true });
    }catch(err){
        console.error(err);
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`));
