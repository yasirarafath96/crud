import React from "react";
import { useEffect, useState } from "react";

function Temp() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/employees")
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div>
      <div>Hellooo </div>
      <div>{employees.name}</div>
      <p>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>
              <button>{employee.name}</button>
            </td>
            <td>{employee.role}</td>
            <td>{employee.email}</td>
            <td>{employee.gender}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </p>
    </div>
  );
}

export default Temp;
