import './Employee_Edit.css';
import '../../services/EmployeeService';
import { useState, useEffect } from 'react';
import EmployeeService from '../../services/EmployeeService';
import EmployeeDTO from '../../dto/EmployeeDTO';
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';


const EmployeeEdit : React.FC = () => {
  const [employee, setEmployee] = useState({} as EmployeeDTO);
  const [service, setService] = useState({} as EmployeeService);
  
  const params = useParams();
  const navigate = useNavigate();
  let errors = {};

  const onSubmit = (e: any) => {
    const vals = getValues();
    employee.firstName = vals.firstName;
    employee.lastName = vals.lastName;
    employee.id = vals.id;
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

  const { register, handleSubmit, reset, setValue, getValues } = useForm<EmployeeDTO>();

  useEffect(() => {
    const employeeService = new EmployeeService();
    setService(employeeService)
    if(!isEdit) {
      setValue("id", 0);
      setValue("firstName", "");
      setValue("lastName", "");
      setEmployee(new EmployeeDTO(0, "", ""))
    }
    else {
      employeeService.loadOne(id)
      .then(val => {
        setValue("id", val.id);
        setValue("firstName", val.firstName);
        setValue("lastName", val.lastName);
        setEmployee(val);
      })
    }
  }, [])

  const id: number = Number.parseInt(params.id === undefined ? "0" : params!.id);
  const isEdit: boolean = id !== 0;

  return (
    <div className="Employee">
      <h1>{isEdit ? employee.firstName + " wijzigen" : "Medewerker aanmaken"}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">Voornaam</label>
        <input type="text" {...register('firstName')}></input>
        <label htmlFor="lastName">Achternaam</label>
        <input type="text" {...register('lastName')}></input>
        <input type="submit" value={isEdit ? "Wijzig" : "Maak"} className="edit-button"></input>
      </form>
    </div>
  );
}

export default EmployeeEdit
