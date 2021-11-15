import './Employee_List.css';
import '../../services/EmployeeService';
import { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeDTO from '../../dto/EmployeeDTO';
import { Link } from 'react-router-dom';

function EmployeeList() {
  const [employees, setEmployees] = useState([] as EmployeeDTO[]);
  const [service, setService] = useState({} as EmployeeService);

  useEffect(() => {
    const employeeService = new EmployeeService();
    setService(employeeService)
    employeeService.loadAll()
    .then(val => {
      setEmployees(val);
    })
  }, [])

  const deleteEmployee = (id: number) => {
    setEmployees(employees.filter(x => x.id !== id))
    service.delete(id);
  }

  return (
    <div className="EmployeeList">
      <div className="header">
        <h1>Medewerkers</h1>
        <Link className="edit-button" to="edit/0">Medewerker toevoegen</Link>
      </div>
      <ul>
        {employees.map(employee => {
          return <div className="row" key={employee.id}>
            <Link to={employee.id.toString()} className="item">
              <li>
                <p>
                  {employee.firstName}
                </p>
              </li>
            </Link>
            <div className="actions">
                  <Link className="edit" to={"edit/" + employee.id}>Pen</Link>
                  <p onClick={() => deleteEmployee(employee.id)} className="delete">Trash</p>
            </div>
          </div>
        })}
      </ul>
    </div>
  );
}

export default EmployeeList;
