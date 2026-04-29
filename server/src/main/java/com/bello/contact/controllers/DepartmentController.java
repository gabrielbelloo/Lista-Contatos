package com.bello.contact.controllers;

import com.bello.contact.dtos.DepartmentDTO;
import com.bello.contact.mappers.DepartmentMapper;
import com.bello.contact.services.DepartmentService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/api/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<DepartmentDTO> add(@RequestBody @Valid DepartmentDTO dto){
        try {
            DepartmentDTO request = departmentService.saveDepartment(dto);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(request.getId()).toUri();
            return ResponseEntity.created(uri).body(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<DepartmentDTO>> list(){
        List<DepartmentDTO> request = departmentService.findAll()
                .stream()
                .map(DepartmentMapper::toDTO)
                .toList();
        return ResponseEntity.ok(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDTO> find(@PathVariable Long id){
        try {
            DepartmentDTO request = departmentService.findByIdDepartment(id);
            return ResponseEntity.ok(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<DepartmentDTO> update(@RequestBody DepartmentDTO dto, @PathVariable Long id){
        try{
            DepartmentDTO request = departmentService.updateDepartment(dto, id);
            return ResponseEntity.ok(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        try {
            departmentService.deleteDepartment(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
