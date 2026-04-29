package com.bello.contact.services;
import com.bello.contact.dtos.DepartmentDTO;
import com.bello.contact.entities.DepartmentEntity;
import com.bello.contact.mappers.DepartmentMapper;
import com.bello.contact.repositories.DepartmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public DepartmentDTO saveDepartment(DepartmentDTO dto){
        DepartmentEntity department = DepartmentMapper.toEntity(dto);

        if (departmentRepository.findByName(department.getName()).isPresent()){
            throw new RuntimeException("department already exists");
        }
        return DepartmentMapper.toDTO(departmentRepository.save(department));
    }

    public List<DepartmentEntity> findAll(){
        return departmentRepository.findAll();
    }

    public DepartmentDTO findByIdDepartment(Long id){
        return DepartmentMapper.toDTO(departmentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("department not found")));
    }

    public DepartmentDTO updateDepartment(DepartmentDTO dto, Long id){
        DepartmentEntity entity = DepartmentMapper.toEntity(findByIdDepartment(id));

        entity.setName(dto.getName());

        return DepartmentMapper.toDTO(departmentRepository.save(entity));
    }

    public void deleteDepartment(Long id){
        if (!departmentRepository.existsById(id)){
            throw new EntityNotFoundException("department not found");
        }
        departmentRepository.deleteById(id);
    }
}