import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmpployee = ({ employees, onUpdateEmployee }) => {
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
      <button onClick={() => navigate("/")} className="btn btn-secondary mb-2">
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
              className="btn btn-success mt-2"
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

export default EditEmpployee;
