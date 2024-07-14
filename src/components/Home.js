import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Temp from "./Temp";
import axios from "axios";

const Home = ({ employees, onDeleteEmployee }) => {
  const navigate = useNavigate();
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const handleAdd = () => {
    navigate("/add");
  };

  const handleEdit = (id) => {
    navigate(`/employee/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
  };

  // const handleConfirmDelete = () => {
  //   if (employeeToDelete !== null) {
  //     onDeleteEmployee(employeeToDelete);
  //     // Reset the state after deletion
  //     setEmployeeToDelete(null);
  //   }
  // };

  const handleConfirmDelete = () => {
    if (employeeToDelete !== null) {
      axios
        .delete(`http://localhost:5000/employees/${employeeToDelete}`)
        .then((response) => {
          console.log(response.data.message);
          onDeleteEmployee(employeeToDelete);
          setEmployeeToDelete(null); // Reset the state after deletion
        })
        .catch((error) => {
          if (error.response) {
            // Server responded with a status other than 200 range
            console.error("Server error:", error.response.data);
            alert(`Server error: ${error.response.data.message}`);
          } else if (error.request) {
            // Request was made but no response was received
            console.error("Network error:", error.request);
            alert(
              "Internet Not connect Please check your connection and try it again."
            );
          } else {
            // Something else caused the error
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`);
          }
        });
    }
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
                  className="btn btn-link text-decoration-none"
                  onClick={() => handleDetails(employee.id)}
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
                  onClick={() => handleEdit(employee.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
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
