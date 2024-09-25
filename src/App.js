import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EditEmpployee from "./components/EditEmployee";
import Details from "./components/Details";
import axios from "axios";
import Department from "./components2/Department";
import AddDepartments from "./components2/AddDepartments";
import MainPage from "./component0/MainPage";
import DeptDetails from "./components2/DeptDetails";
import EditDepartments from "./components2/EditDepartments";
import Temporary from "./components3/Temporary";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    Cars_data();
  }, []);

  const fetchEmployees = () => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchDepartments = () => {
    fetch("http://localhost:5000/departments")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      })
      .then((data) => {
        console.log("ddepartment data ------>",data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const Cars_data = () => {
    fetch("http://localhost:5000/cars")
      .then((response) => response.json())
      .then((data) => {
        setCars(data);
      }).then((data) => console.log(data));
  };

  // console.log(cars);

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

  const addDepartment = (department) => {
    setDepartments([
      ...departments,
      { id: departments.length + 1, ...department },
    ]);
    console.log("New Department added to table");
  };

  const updateDepartment = async (updatedDepartment) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/departments/${updatedDepartment.id}`,
        updatedDepartment
      );
      setDepartments(
        departments.map((department) =>
          department.id === updatedDepartment.id
            ? updatedDepartment
            : department
        )
      );
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  const deleteDepartment = (id) => {
    setDepartments(departments.filter((department) => department.id !== id));
    console.log(`department deleted`);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/Home"
          element={
            <Home employees={employees} onDeleteEmployee={deleteEmployee} />
          }
        />
        <Route
          path="/add"
          element={
            <AddEmployee
              onAddEmployee={addEmployee}
              fetchEmployees={fetchEmployees}
              employees={employees}
            />
          }
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

        {/* Department */}
        <Route
          path="/departments"
          element={
            <Department
              departments={departments}
              onDeleteDepartment={deleteDepartment}
            />
          }
        />

        <Route
          path="/AddDepartments"
          element={
            <AddDepartments
              onAddDepartment={addDepartment}
              fetchDepartments={fetchDepartments}
            />
          }
        />
        <Route
          path="/department/:id"
          element={
            <EditDepartments
              departments={departments}
              onUpdateDepartment={updateDepartment}
            />
          }
        />
        <Route
          path="/depdetails/:id"
          element={<DeptDetails departments={departments} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

// ctr + p, ctr + d + ctr + L + shift , ctr + T, ctr + `,
