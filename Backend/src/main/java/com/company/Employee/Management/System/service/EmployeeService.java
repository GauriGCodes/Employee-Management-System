package com.company.Employee.Management.System.service;

import com.company.Employee.Management.System.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    public EmployeeDto createEmployee(EmployeeDto employeeDto);
    public EmployeeDto getEmployeeById(Long id);
    public List<EmployeeDto> getEmployeeList();
    public EmployeeDto updateEmployee(EmployeeDto employeeDto);
    public void deleteEmployee(Long id);
}
