import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartments = ({ departments, onUpdateDepartment }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const department = departments.find((dep) => dep.id === parseInt(id));

  console.log(department);

  const [formData, setFormData] = useState({
    name: "",
    head: "",
    location: "",
  });

  useEffect(() => {
    if (department) {
      setFormData(department);
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // if value == updated value ? value : updated value
  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/departments/${id}`,
        formData
      );
      onUpdateDepartment(response.data);
      navigate("/departments");
    } catch (error) {
      console.error("Error updating department:", error);
    }
  };

  if (!department) {
    return <div className="container mt-2">Depart NOT FOUND</div>;
  }

  return (
    <div className="container">
      <h1>Edit Employee</h1>
      <button
        onClick={() => navigate("/departments")}
        className="btn btn-secondary mb-2"
      >
        Back
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
          <label className="col-sm-2 col-form-label">Head:</label>
          <div className="col-sm-6">
            <input
              type="text"
              name="head"
              value={formData.head}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">location:</label>
          <div className="col-sm-6">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditDepartments;
