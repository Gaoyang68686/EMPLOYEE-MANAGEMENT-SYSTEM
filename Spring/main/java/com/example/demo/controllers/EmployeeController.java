package com.example.demo.controllers;

import java.util.*;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.models.Employee;
import com.example.demo.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping(value = "/api", method = RequestMethod.GET)
public class EmployeeController {
    @Autowired
    private EmployeeRepository employeeRepository;

    // get an employee by id
    @RequestMapping(value = "/api/employees/{id}", method = RequestMethod.GET)
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Exists"));
        return ResponseEntity.ok(employee);
    }

    // get all employees
    @RequestMapping(value = "/api/employees", method = RequestMethod.GET)
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // add an employee
    @RequestMapping(value = "/api/employees", method = RequestMethod.POST)
    public Employee addEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    // update an employee
    @RequestMapping(value = "/api/employees/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetail){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Exists"));
        employee.setName(employeeDetail.getName());
        employee.setAddress(employeeDetail.getAddress());
        employee.setDob(employeeDetail.getDob());
        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }

    // delete an employee
    @RequestMapping(value = "/api/employees/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee Not Exists"));
        employeeRepository.delete(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
    // get an employee by name
    @RequestMapping(value = "/api/employees/search/{name}", method = RequestMethod.GET)
    public ResponseEntity<Employee> getEmployeeByName(@PathVariable String name){
            Optional<Employee> employee = employeeRepository.findByName(name);
            if (employee.isPresent()) {
                return getEmployeeById(employee.get().getId());
            } else {
                throw new ResourceNotFoundException("Employee Not Exists");
            }
    }

    // get employees by birthday
    @RequestMapping(value = "/api/employees/birthday", method = RequestMethod.GET)
    public List<Employee> getEmployeeByBirthday(){
        String today = LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        return employeeRepository.findEmployeesByBirthday(today);
    }
}
