import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const OpenHome = () => {
    navigate("/Home");
  };
  const OpenDepartment = () => {
    navigate("/Departments");
  };
  const OpenQuery = () => {
    navigate("/Query");
  };

  return (
    <>
      <nav class="navbar bg-body-tertiary mb-2">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h2 ">Main Page</span>
        </div>
      </nav>
      <div className="container">
        <div className="row--6 ">
          <div className="col">
            <button type="button" class="btn btn-info mb-2" onClick={OpenHome}>
              Employee
            </button>
          </div>
          <div className="col">
            <button
              type="button"
              class="btn btn-info mb-2"
              onClick={OpenDepartment}
            >
              Department
            </button>
          </div>
         
        </div>
      </div>
    </>
  );
}

export default MainPage;
