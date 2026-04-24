package com.bello.contact.mappers;

import com.bello.contact.dtos.DepartmentDTO;
import com.bello.contact.entities.DepartmentEntity;

public class DepartmentMapper {

    public static DepartmentEntity toEntity(DepartmentDTO dto){
        DepartmentEntity entity = new DepartmentEntity();

        entity.setName(dto.getName());

        return entity;
    }

    public static DepartmentDTO toDTO(DepartmentEntity entity){
        DepartmentDTO dto = new DepartmentDTO();

        dto.setName(entity.getName());

        return dto;
    }
}
