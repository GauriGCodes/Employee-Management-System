package com.company.Employee.Management.System.repository;

import com.company.Employee.Management.System.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

}
