import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Department({ departments, onDeleteDepartment }) {
  const navigate = useNavigate();
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  console.log(departments);

  const handleAdd = () => {
    navigate("/AddDepartments");
  };

  const handleEdit = (id) => {
    navigate(`/department/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/depdetails/${id}`);
  };

  const handleDeleteClick = (id) => {
    setDepartmentToDelete(id);
  };

  const handleConfirmDelete = () => {
    if (departmentToDelete !== null) {
      axios
        .delete(`http://localhost:5000/departments/${departmentToDelete}`)
        .then((response) => {
          console.log(response.data.message);
          onDeleteDepartment(departmentToDelete);
          setDepartmentToDelete(null);
        })
        .catch((error) => {
          if (error.response) {
            console.error("Server error:", error.response.data);
            alert(`Server error: ${error.response.data.message}`);
          } else if (error.request) {
            console.error("Network error:", error.request);
            alert(
              "Internet Not connect Please check your connection and try it again."
            );
          } else {
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`);
          }
        });
    }
  };
  return (
    <div className="container">
      <h1>Departments</h1>
      <button onClick={handleAdd} className="btn btn-primary mb-2">
        Add
      </button>
      <table className="table table-success table-striped table-hover table-bordered">
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Head of Department</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>
                <button
                  className="btn btn-link text-decoration-none"
                  onClick={() => handleDetails(department.id)}
                >
                  {department.name}
                </button>
              </td>
              <td>{department.head}</td>
              <td>{department.location}</td>
              <td>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleEdit(department.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  onClick={() => handleDeleteClick(department.id)}
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
              Are you sure you want to delete this department?
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
}

export default Department;
