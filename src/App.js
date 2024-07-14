import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EditEmpployee from "./components/EditEmployee";
import Details from "./components/Details";
import axios from "axios";
// import Temp from "./components/Temp";

const App = () => {
  // state variable
  const [employees, setEmployees] = useState([]);

  // data fetching
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
    console.log(JSON.stringify(employees));
    console.log("New Employe added to table ^^");
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );

    console.log("Employee updated");
    console.log(`updated array `, JSON.stringify(employees));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    console.log(`Employee deleted`);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home employees={employees} onDeleteEmployee={deleteEmployee} />
          }
        />
        <Route
          path="/add"
          element={<AddEmployee onAddEmployee={addEmployee} />}
        />
        <Route
          path="/employee/:id"
          element={
            <EditEmpployee
              employees={employees}
              onUpdateEmployee={updateEmployee}
            />
          }
        />
        <Route
          path="/details/:id"
          element={<Details employees={employees} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
