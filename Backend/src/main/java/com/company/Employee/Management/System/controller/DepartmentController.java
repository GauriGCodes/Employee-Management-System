package com.company.Employee.Management.System.controller;

import com.company.Employee.Management.System.dto.DepartmentDto;
import com.company.Employee.Management.System.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/department/v1/")
public class DepartmentController {
    private DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService){
        this.departmentService=departmentService;
    }

    @GetMapping
    public ResponseEntity<List<DepartmentDto>> getAllDepartments(){
        return new ResponseEntity<>(this.departmentService.getDepartmentList(), HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable(name = "id") Long departmentID){
        return new ResponseEntity<>(this.departmentService.getDepartmentById(departmentID),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DepartmentDto> createNewDepartment(@RequestBody DepartmentDto departmentDto){
        return new ResponseEntity<>(this.departmentService.createDepartment(departmentDto),HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<DepartmentDto> updateDepartment(@RequestBody DepartmentDto departmentDto){
        return new ResponseEntity<>(this.departmentService.updateDepartment(departmentDto),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable(name = "id") Long departmentID){
        this.departmentService.deleteDepartment(departmentID);
        return new ResponseEntity<>("Department with ID: "+departmentID+" has been deleted successfully",HttpStatus.OK);
    }


}
