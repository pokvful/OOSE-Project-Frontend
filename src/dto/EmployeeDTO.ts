class EmployeeDTO {
    id: number = 0;
    firstName: string = "";
    lastName: string = "";

    constructor(employeeDTO?: EmployeeDTO) {
        Object.assign(this, employeeDTO);
    }

}

export default EmployeeDTO;