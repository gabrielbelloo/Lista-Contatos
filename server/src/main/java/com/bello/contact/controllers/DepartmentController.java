package com.bello.contact.controllers;

import com.bello.contact.dtos.DepartmentDTO;
import com.bello.contact.services.DepartmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<DepartmentDTO> saveDepartment(@RequestBody @Valid DepartmentDTO dto){
        DepartmentDTO request = departmentService.saveDepartment(dto);
    }
}
