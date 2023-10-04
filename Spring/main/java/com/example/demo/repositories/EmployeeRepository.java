package com.example.demo.repositories;

import  java.util.*;
import com.example.demo.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long > {
    Optional<Employee> findByName(String name);
    @Query("SELECT e FROM Employee e WHERE e.dob = :today")
    List<Employee> findEmployeesByBirthday(String today);
}
