require("dotenv").config();
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
});

const API_KEY = process.env.API_KEY;

app.post("/auth", (req, res) => {
  const { username, password } = req.body;

  db.query("SELECT * FROM users", (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ status: "ERROR" });
    }
    const checkUser = result.find((user) => {
      if (user.username === username && user.password === password) {
        return user;
      }
    });

    if (checkUser) {
      return res.status(200).json({ status: "SUCESS", apiKey: 1 });
    }

    return res.status(401).json({ status: "UNATHORIZED" });
  });
});

app.listen(8080, () => {
  console.log("App listening on port 8080!");
});
