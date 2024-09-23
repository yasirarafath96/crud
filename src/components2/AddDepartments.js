import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = ({ onAddDepartment, fetchDepartments }) => {
  const [formData, setFormData] = useState({
    name: "",
    head: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.head || !formData.location) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/departments",
        formData
      );
      console.log(response.data.message);
      onAddDepartment(response.data.department);
      await fetchDepartments();
      navigate("/departments");
    } catch (error) {
      if (error.response) {
        console.error("Server error:", error.response.data);
        alert(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Network error:", error.request);
        alert(
          "Internet not connected. Please check your connection and try again."
        );
      } else {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="container">
      <h1>Add Department</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label className="col-sm-2 col-form-label">Department Name:</label>
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
          <label className="col-sm-2 col-form-label">Head of Department:</label>
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
          <label className="col-sm-2 col-form-label">Location:</label>
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

export default AddDepartment;
