import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const AddEmployee = ({ onAddEmployee, hobbies }) => {
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
  const [invalidEmail, setInvalidEmail] = useState("");

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
    // only upto 3  hobbies only
    if (formData.hobbies.length < 3) {
      setFormData({ ...formData, hobbies: [...formData.hobbies, ""] });
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Valid Email
  //   if (!emailPattern.test(formData.email)) {
  //     setInvalidEmail(() => {
  //       console.log("Invalid Email ENtered");
  //       alert("Enter valid Email");
  //     });
  //     return;
  //   }
  //   setInvalidEmail("");
  //   onAddEmployee(formData);
  //   navigate("/");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailPattern.test(formData.email)) {
      setInvalidEmail(() => {
        console.log("Invalid Email Entered");
        alert("Enter valid Email");
      });
      return;
    }
    setInvalidEmail("");

    axios
      .post("http://localhost:5000/employees", formData)
      .then((response) => {
        console.log(response.data.message);
        onAddEmployee(response.data.employee);
        navigate("/");
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
  };

  // handleing age  btwn 10 and 65 nly
  const handleAgeChange = (e) => {
    let value = e.target.value;
    if (value < 10) {
      value = 10;
    } else if (value > 65) {
      value = 65;
    }
    handleChange({ target: { name: "age", value } });
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
              onChange={handleAgeChange}
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

export default AddEmployee;
