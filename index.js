//import the dependencies
require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//use bodyParse for parse body in json format
app.use(bodyParser.json());
//use express to load front-end static files
app.use(express.static("public"));

//create mysql db connection object
const db = mysql.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

//load apiKey
const API_KEY = process.env.API_KEY;

//create route to get new user and save it on the database
app.post("/auth", (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users", (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: "ERROR" });
    }
    //check if use exist in the database
    const checkUser = result.find((user) => {
      if (user.username === username && user.password === password) {
        return user;
      }
    });
    //if user exist, return status 200 and apiKey to frontEnd
    if (checkUser) {
      return res.status(200).json({ status: "SUCESS", apiKey: 1 });
    }
    //if doest exist, return 401 unautorized status
    return res.status(401).json({ status: "UNATHORIZED" });
  });
});

app.listen(8080, () => {
  console.log("App listening on port 8080!");
});
