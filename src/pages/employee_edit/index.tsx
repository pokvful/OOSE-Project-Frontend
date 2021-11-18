import './Employee_Edit.css';
import '../../services/EmployeeService';
import { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeDTO from '../../dto/EmployeeDTO';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import Input from '../../components/input/Input';

const EmployeeEdit : React.FC = () => {
  const [employee, setEmployee] = useState({} as EmployeeDTO);
  const [service, setService] = useState({} as EmployeeService);
  
  const params = useParams();
  const navigate = useNavigate();
  let errors = {};

  const onSubmit = (e: any) => {
    if(!isEdit) {
      service.create(employee)
      .then(() => {
        toast.success("Medewerker aangemaakt!");
        navigate("/employees");
      }).catch((error) => {
        errors = error.response.data;
        console.log(errors);
      });

    }
    else {
      service.update(employee);
      toast.success("Medewerker bijgewerkt!");
      navigate("/employees");
    }
  }

  useEffect(() => {
    const employeeService = new EmployeeService();
    setService(employeeService)
    if(!isEdit) {
      setEmployee(new EmployeeDTO())
    }
    else {
      employeeService.loadOne(id)
      .then(val => {
        setEmployee(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setEmployee({...employee, [e.target.id]: e.target.value})
  }

  return (
    <div className="Employee">
      <h1>{isEdit ? employee.firstName + " wijzigen" : "Medewerker aanmaken"}</h1>
      <form onSubmit={onSubmit}>
        <Input placeholderText={'Voornaam'} inputName={'firstName'} inputType={'text'} inputLabel={'Voornaam'} onChange={handleChange} value={employee.firstName}/>
        <Input placeholderText={'Achternaam'} inputName={'lastName'} inputType={'text'} inputLabel={'Achternaam'} onChange={handleChange} value={employee.lastName}/>
        <input type="submit" value={isEdit ? "Wijzig" : "Maak"} className="edit-button"></input>
      </form>
    </div>
  );
}

export default EmployeeEdit
