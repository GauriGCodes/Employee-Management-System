package com.company.Employee.Management.System.mapper;

import com.company.Employee.Management.System.dto.EmployeeDto;
import com.company.Employee.Management.System.entity.Employee;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(employee.getEmployeeID(),employee.getFirstName(),employee.getLastName(),employee.getEmail(),employee.getDepartment().getDepartmentID());
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        Employee employee = new Employee();
        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        return employee;
    }

}
