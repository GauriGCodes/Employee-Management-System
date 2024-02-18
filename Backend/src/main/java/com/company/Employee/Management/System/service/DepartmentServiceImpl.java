package com.company.Employee.Management.System.service;

import com.company.Employee.Management.System.dto.DepartmentDto;
import com.company.Employee.Management.System.entity.Department;
import com.company.Employee.Management.System.exception.DepartmentNotFoundException;
import com.company.Employee.Management.System.mapper.DepartmentMapper;
import com.company.Employee.Management.System.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentServiceImpl implements DepartmentService{

    private DepartmentRepository departmentRepository;

    @Autowired
    public DepartmentServiceImpl(DepartmentRepository departmentRepository){
        this.departmentRepository=departmentRepository;
    }

    @Override
    public DepartmentDto createDepartment(DepartmentDto departmentDto) {
        Department department = DepartmentMapper.mapToDepartment(departmentDto);
        Department createdDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(createdDepartment);
    }

    @Override
    public DepartmentDto getDepartmentById(Long id) {
                Department department = departmentRepository.findById(id).orElseThrow(()-> new DepartmentNotFoundException("Department with ID: "+id+" not found"));
                return DepartmentMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<DepartmentDto> getDepartmentList() {
        List<Department> departmentList = departmentRepository.findAll();
        List<DepartmentDto> departmentDtoList = new ArrayList<>();
        for(Department department:departmentList){
            departmentDtoList.add(DepartmentMapper.mapToDepartmentDto(department));
        }

        return departmentDtoList;
    }

    @Override
    public DepartmentDto updateDepartment(DepartmentDto departmentDto) {
        Department department = departmentRepository.findById(departmentDto.getDepartmentID()).orElseThrow(()-> new DepartmentNotFoundException("Department with ID: "+departmentDto.getDepartmentID()+" not found"));
        department.setDescription(departmentDto.getDescription());
        department.setName(departmentDto.getName());
        Department updatedDepartment = departmentRepository.save(department);
        return DepartmentMapper.mapToDepartmentDto(updatedDepartment);
    }

    @Override
    public void deleteDepartment(Long id) {
        Department department = departmentRepository.findById(id).orElseThrow(()-> new DepartmentNotFoundException("Department with ID: "+id+" not found"));
        departmentRepository.delete(department);
    }
}
