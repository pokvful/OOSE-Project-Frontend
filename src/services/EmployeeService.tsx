import axios from "axios";
import EmployeeDTO from "../dto/EmployeeDTO";
import IService from "./IService";

class EmployeeService implements IService<EmployeeDTO> {
    async loadAll(): Promise<EmployeeDTO[]> {
        return axios.get("http://localhost:8080/employees")
        .then(response => response.data)
        .then(data => {
            let toReturn = [] as EmployeeDTO[];
            data.forEach((employee: any) => {
                let employeeDto: EmployeeDTO = new EmployeeDTO();
                employeeDto.id = employee.id;
                employeeDto.firstName = employee.firstName;
                employeeDto.lastName = employee.lastName;
                toReturn.push(employeeDto);
            });

            return toReturn;
        });
    }
    async loadOne(id: number): Promise<EmployeeDTO> {
        return axios.get("http://localhost:8080/employees/" + id)
        .then(response => response.data)
        .then(employee => {
            let employeeDto: EmployeeDTO = new EmployeeDTO();
            employeeDto.id = employee.id;
            employeeDto.firstName = employee.firstName;
            employeeDto.lastName = employee.lastName;
           return employeeDto;
        });
    }
    update(value: EmployeeDTO): Promise<void> {
        return axios.put("http://localhost:8080/employees", value);
    }
    create(value: EmployeeDTO): Promise<void> {
        return axios.post("http://localhost:8080/employees", value);
    }
    delete(id: number): Promise<void> {
        return axios.delete("http://localhost:8080/employees/" + id);
    }
}

export default EmployeeService;