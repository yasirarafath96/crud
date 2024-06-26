import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleConfirmDelete = () => {
    if (employeeToDelete !== null) {
      onDeleteEmployee(employeeToDelete);
      setEmployeeToDelete(null); // Reset the state after deletion
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
                  className="btn btn-link"
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
                  className="btn btn-primary"
                  onClick={() => handleEdit(employee.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ml-2"
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

/*

import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ employees, onDeleteEmployee }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add");
  };

  const handleEdit = (id) => {
    navigate(`/employee/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const Delete = (id) => {
    onDeleteEmployee(id);
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
                  className="btn btn-primary"
                  onClick={() => handleEdit(employee.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="btn btn-danger ml-2"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => Delete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={() => DeleteOne()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </tbody>
      </table>
    </div>
  );
};

export default Home;

*/
