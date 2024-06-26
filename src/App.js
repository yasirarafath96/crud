import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EditEmployee";
import Details from "./components/Details";

const App = () => {
  const [employees, setEmployees] = useState([]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
    console.log(employee);
    console.log("New Employe added to table ^^");
    console.log(`all ->>`);
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
            <EmployeeDetails
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

/*  
const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

*/

/*

{
      id: 1,
      name: "yasir",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
    {
      id: 2,
      name: "sagar",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
    {
      id: 3,
      name: "3 - sagar",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
    {
      id: 4,
      name: "4 - sagar",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },

*/

/* 

import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import EmployeeDetails from "./components/EmployeeDetails";

const App = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "yasir",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
    {
      id: 2,
      name: "sagar",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
    {
      id: 3,
      name: "3 - sagar",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
    {
      id: 4,
      name: "4 - sagar",
      role: "Developer",
      email: "yasir@gmail.com",
      gender: "Male",
      hobbies: ["Reading"],
    },
  ]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { id: employees.length + 1, ...employee }]);
    console.log(employee);
    console.log("New Employe added to table ^^");
    console.log(all ->>);
  };

  const updateEmployee = (updatedEmployee) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );

    console.log("Employee updated");
    console.log(updated array , JSON.stringify(employees));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    console.log(Employee deleted);
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
            <EmployeeDetails
              employees={employees}
              onUpdateEmployee={updateEmployee}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ employees, onDeleteEmployee }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add");
  };

  return (
    <div className="container">
      <h1>Employees</h1>
      <button onClick={handleAdd} className="btn btn-primary mb-2">
        Add
      </button>
      <table className="table table-success table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => navigate(/employee/${employee.id})}
                >
                  {employee.name}
                </button>
              </td>
              <td>{employee.role}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button
                  type="button"
                  className="btn btn-primary ml-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Delete
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          Deleting
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Do you really want to delete employee details?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => onDeleteEmployee(employee.id)}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
// src/components/AddEmployee.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    roleDesc: "",
    age: "",
    email: "",
    gender: "",
    hobbies: [""],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHobbyChange = (index, value) => {
    const newHobbies = [...formData.hobbies];
    newHobbies[index] = value;
    setFormData({ ...formData, hobbies: newHobbies });
  };

  const addHobby = () => {
    setFormData({ ...formData, hobbies: [...formData.hobbies, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEmployee(formData);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Role:</label>
          <div className="col-sm-6">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Role Description:</label>
          <div className="col-sm-6">
            <textarea
              name="roleDesc"
              value={formData.roleDesc}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Age:</label>
          <div className="col-sm-6">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Email:</label>
          <div className="col-sm-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </fieldset>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Hobbies:</label>
          <div className="col-sm-6">
            {formData.hobbies.map((hobby, index) => (
              <input
                key={index}
                type="text"
                value={hobby}
                onChange={(e) => handleHobbyChange(index, e.target.value)}
                className="form-control mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={addHobby}
              className="btn btn-secondary mt-2"
            >
              Add Hobby
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EmployeeDetails = ({ employees, onUpdateEmployee }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find((emp) => emp.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    roleDesc: "",
    age: "",
    email: "",
    gender: "",
    hobbies: [""],
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHobbyChange = (index, value) => {
    const newHobbies = [...formData.hobbies];
    newHobbies[index] = value;
    setFormData({ ...formData, hobbies: newHobbies });
  };

  const addHobby = () => {
    setFormData({ ...formData, hobbies: [...formData.hobbies, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateEmployee(formData);
    navigate("/");
  };

  if (!employee) {
    return <div>Employee not found</div>;
  }

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <button type="submit" className="btn btn-primary">
        Edit
      </button>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Name:</label>
          <div className="col-sm-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Role:</label>
          <div className="col-sm-6">
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Role</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Role Description:</label>
          <div className="col-sm-6">
            <textarea
              name="roleDesc"
              value={formData.roleDesc}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Age:</label>
          <div className="col-sm-6">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Email:</label>
          <div className="col-sm-6">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
          <div className="col-sm-10">
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">Male</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
                className="form-check-input"
                required
              />
              <label className="form-check-label">Female</label>
            </div>
          </div>
        </fieldset>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Hobbies:</label>
          <div className="col-sm-6">
            {formData.hobbies.map((hobby, index) => (
              <input
                key={index}
                type="text"
                value={hobby}
                onChange={(e) => handleHobbyChange(index, e.target.value)}
                className="form-control mb-2"
                required
              />
            ))}
            <button
              type="button"
              onClick={addHobby}
              className="btn btn-secondary mt-2"
            >
              Add Hobby
            </button>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="btn btn-secondary mb-2"
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EmployeeDetails;

*/
