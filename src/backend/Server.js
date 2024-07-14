/*
// import required modules
const express = require("express");
// Web framework
const mysql = require("mysql2");
// MySQL client
const bodyParser = require("body-parser");
// Parse JSON
const cors = require("cors");
// Enable CORS

// create an instance of express app
const app = express();
const port = 5000;

// middleware setup
app.use(cors());
// enable cors
app.use(bodyParser.json());
// parse json bodies

// database connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "82DKdk63**911",
  database: "Employees",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting to the database:", err);
    return;
  }
  console.log("connected to the mysql database.");
});

// define endpoint to fetch employees
app.get("/employees", (req, res) => {
  const query = "select * from Employee";

  // execute sql query
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
    // send json response
  });
});

// POST
// define endpoint to add new employee
app.post("/employees", (req, res) => {
  const { name, role, roleDesc, age, email, gender, hobbies } = req.body;
  const query =
    "INSERT INTO Employee (name, role, roleDesc, age, email, gender, hobbies) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    role,
    roleDesc,
    age,
    email,
    gender,
    JSON.stringify(hobbies),
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      message: "Employee added successfully!",
      employeeId: results.insertId,
    });
  });
});

// DELETE endpoint to remove an employee by ID
app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Employee WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting employee", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully!" });
  });
});

// start the server
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
  console.log("great news");
});
*/
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "82DKdk63**911",
  database: "Employees",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.get("/employees", (req, res) => {
  const query = "SELECT * FROM Employee";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

app.post("/employees", (req, res) => {
  const { name, role, roleDesc, age, email, gender, hobbies } = req.body;
  const query =
    "INSERT INTO Employee (name, role, roleDesc, age, email, gender, hobbies) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    name,
    role,
    roleDesc,
    age,
    email,
    gender,
    JSON.stringify(hobbies),
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({
      message: "Employee added successfully!",
      employeeId: results.insertId,
    });
  });
});

app.delete("/employees/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM Employee WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting employee", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
