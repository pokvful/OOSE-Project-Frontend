import './Employee_Detail.css';
import '../../services/EmployeeService';
import { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeDTO from '../../dto/EmployeeDTO';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

function EmployeeDetail() {
  const [employee, setEmployee] = useState({} as EmployeeDTO);
  const [service, setService] = useState({} as EmployeeService);

  const params = useParams();
  useEffect(() => {
    const employeeService = new EmployeeService();
    setService(employeeService)
    employeeService.loadOne(id)
    .then(val => {
      setEmployee(val);
    })
  }, [])

  if(params.id === undefined) {
    return <div></div>
  }

  const id: number = Number.parseInt(params.id);

  return (
    <div className="Employee">
      <div className="box">
        <h1>{employee.firstName}</h1>
        <Link className="edit-button" to={"/employees/edit/" + employee.id}><p>Wijzigen</p></Link>
      </div>
      <table>
        <tbody>
          <tr>
            <td>Voornaam:</td>
            <td>{employee.firstName}</td>
          </tr>
          <tr>
            <td>Achternaam:</td>
            <td>{employee.lastName}</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default EmployeeDetail;
