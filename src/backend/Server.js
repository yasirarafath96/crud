const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// employee db
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

const employeesData = "";

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

// GETTING DATA endpoints
// crct
app.get("/departments", (req, res) => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    console.log(results);
    res.json(results);
  });
});

// ADDING DATA
// correct
app.post("/departments", (req, res) => {
  const { name, head, location } = req.body;
  const query =
    "INSERT INTO departments (name, head, location, employee_id) VALUES (?, ?, ?, (SELECT id FROM employee WHERE name = '?'))";
  const values = [name, head, location, employee.name];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).send(err);
    }
    res.json({
      message: "Department added successfully!",
      departmentId: results.insertId,
    });
  });
});

// UPDATING DATA
app.put("/departments/:id", (req, res) => {
  const { id } = req.params;
  const { name, head, location } = req.body;
  const query =
    "UPDATE departments SET name = ?, head = ?, location = ? WHERE id = ?";
  const values = [name, head, location, id];
  db.query(query, values, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: "Department updated successfully!" });
  });
});

app.delete("/departments/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM departments WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error deleting department", error: err });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.json({ message: "Department deleted successfully!" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
