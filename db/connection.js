const mysql = require("mysql2");

//connect to the MySQL Database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password",
    database: "election",
  },
  console.log("Connected to the election database.")
);

module.exports = db;
