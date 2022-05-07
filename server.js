const express = require("express");
const mysql = require("mysql2");

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

//Get all candidates
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });

//get a single candidate
db.query(`Select * FROM candidates WHERE id=1`, (err, row) => {
  if (err) {
    console.log(err);
  } else {
    console.log(row);
  }
});

//Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//start the express.js server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
