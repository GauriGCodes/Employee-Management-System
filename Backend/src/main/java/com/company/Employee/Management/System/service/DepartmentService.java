package com.company.Employee.Management.System.service;


import com.company.Employee.Management.System.dto.DepartmentDto;

import java.util.List;

public interface DepartmentService {
    public DepartmentDto createDepartment(DepartmentDto departmentDto);
    public DepartmentDto getDepartmentById(Long id);
    public List<DepartmentDto> getDepartmentList();
    public DepartmentDto updateDepartment(DepartmentDto departmentDto);
    public void deleteDepartment(Long id);
}
