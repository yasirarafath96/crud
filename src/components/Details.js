import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Details = ({ employees }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = employees.find((emp) => emp.id === parseInt(id));

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const handleEdit = (id) => {
    navigate(`/employee/${id}`);
  };

  return (
    <div className="container">
      <h1>Employee Details</h1>
      <button onClick={() => navigate("/")} className="btn btn-secondary mb-2">
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={() => handleEdit(employee.id)}
      >
        Edit
      </button>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Name:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{employee.name}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Role:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{employee.role}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Role Description:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{employee.roleDesc}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Age:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{employee.age}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Email:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{employee.email}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Gender:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{employee.gender}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Hobbies:</label>
        <div className="col-sm-6">
          {employee.hobbies.map((hobby, index) => (
            <p key={index} className="form-control-plaintext">
              {hobby}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
