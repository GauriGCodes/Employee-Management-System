package com.company.Employee.Management.System.mapper;

import com.company.Employee.Management.System.dto.DepartmentDto;
import com.company.Employee.Management.System.entity.Department;


public class DepartmentMapper {

    public static DepartmentDto mapToDepartmentDto(Department department){
        return new DepartmentDto(department.getDepartmentID(),department.getName(),department.getDescription());
    }

    public static Department mapToDepartment(DepartmentDto departmentDto){
        return new Department(departmentDto.getDepartmentID(),departmentDto.getName(),departmentDto.getDescription());
    }

}
