import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ employees, onDeleteEmployee }) => {
  const navigate = useNavigate();
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete !== null) {
      axios
        .delete(`http://localhost:5000/employees/${employeeToDelete}`)
        .then((response) => {
          console.log(response.data.message);
          onDeleteEmployee(employeeToDelete);
          setEmployeeToDelete(null);
        })
        .catch((error) => {
          console.error("Error:", error.message);
          alert(`Error: ${error.message}`);
        });
    }
  };

  return (
    <div className="container">
      <h1>Employees</h1>
      <button
        onClick={() => navigate("/")}
        className="btn btn-secondary mx-2 mb-2"
      >
        Back
      </button>
      <button onClick={() => navigate("/add")} className="btn btn-primary mb-2">
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
                  className="btn btn-link text-decoration-none"
                  onClick={() => navigate(`/details/${employee.id}`)}
                >
                  {employee.name}
                </button>
              </td>
              <td>{employee.role}</td>
              <td>{employee.email}</td>
              <td>{employee.gender}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => navigate(`/employee/${employee.id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleDeleteClick(`/details/${employee.id}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
                Confirm Deletion
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this employee?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
