import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Details = ({ departments }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const department = departments.find((dep) => dep.id === parseInt(id));

  if (!department) {
    return <div>Department not found</div>;
  }

  const handleEdit = (id) => {
    navigate(`/department/${id}`);
  };

  return (
    <div className="container">
      <h1>Department Details</h1>
      <button
        onClick={() => navigate("/departments")}
        className="btn btn-secondary me-2"
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={() => handleEdit(department.id)}
      >
        Edit
      </button>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Department Name:</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{department.name}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Head</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{department.head}</p>
        </div>
      </div>
      <div className="row mb-3">
        <label className="col-sm-2 col-form-label">Location</label>
        <div className="col-sm-6">
          <p className="form-control-plaintext">{department.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
