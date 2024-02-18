package com.company.Employee.Management.System.service;

import com.company.Employee.Management.System.dto.EmployeeDto;
import com.company.Employee.Management.System.entity.Department;
import com.company.Employee.Management.System.entity.Employee;
import com.company.Employee.Management.System.exception.DepartmentNotFoundException;
import com.company.Employee.Management.System.exception.EmployeeNotFoundException;
import com.company.Employee.Management.System.mapper.EmployeeMapper;
import com.company.Employee.Management.System.repository.DepartmentRepository;
import com.company.Employee.Management.System.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService{

    private EmployeeRepository employeeRepository;
    private DepartmentRepository departmentRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository){
        this.departmentRepository = departmentRepository;
        this.employeeRepository=employeeRepository;
    }

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Long departmentID = employeeDto.getDepartmentID();
        Department department = departmentRepository.findById(departmentID).orElseThrow(() -> new DepartmentNotFoundException("Department by ID: "+departmentID+" not found"));
        employee.setDepartment(department);
        Employee createdEmployee = this.employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(createdEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long id) {
        Employee employee = this.employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee with id "+id+" not found"));
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getEmployeeList() {
         List<Employee> employees =  this.employeeRepository.findAll();
         List<EmployeeDto> employeeDtoList = new ArrayList<>();
         for(Employee employee:employees){
             employeeDtoList.add(EmployeeMapper.mapToEmployeeDto(employee));
         }
         return employeeDtoList;
    }

    @Override
    public EmployeeDto updateEmployee(EmployeeDto employeeDto) {
        Employee employee = this.employeeRepository.findById(employeeDto.getEmployeeID()).orElseThrow(() -> new EmployeeNotFoundException("Employee with id "+employeeDto.getEmployeeID()+" not found "));
        Long departmentID = employeeDto.getDepartmentID();
        Department department = departmentRepository.findById(departmentID).orElseThrow(() -> new DepartmentNotFoundException("Department by ID: "+departmentID+" not found"));

        employee.setFirstName(employeeDto.getFirstName());
        employee.setLastName(employeeDto.getLastName());
        employee.setEmail(employeeDto.getEmail());
        employee.setDepartment(department);

        Employee updatedEmployee = this.employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee employee = this.employeeRepository.findById(id).orElseThrow(() -> new EmployeeNotFoundException("Employee with id "+id+" not found "));
        this.employeeRepository.delete(employee);
    }

}
