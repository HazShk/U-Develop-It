const express = require("express");
const { param } = require("express/lib/request");
const res = require("express/lib/response");
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

// // // //Delete a candidate ,"?" is a placeholder
// // // db.query(`Delete FROM candidates WHERE id = ?`, 1, (err, result) => {
// // //   if (err) {
// // //     console.log(err);
// // //   } else console.log(result);
// // // });

// // //Create a candidate
// // const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// //               VALUES (?,?,?,?)`;
// // const params = [1, "Ronald", "Firbank", 1];

// // db.query(sql, params, (err, result) => {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log(result);
// //   }
// // });

// Get all candidates
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

//Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

//start the express.js server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
