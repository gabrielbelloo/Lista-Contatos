package com.bello.contact.mappers;

import com.bello.contact.dtos.ExtensionDTO;
import com.bello.contact.entities.ExtensionEntity;

public class ExtensionMapper {

    public static ExtensionEntity toEntity(ExtensionDTO dto){
        ExtensionEntity entity = new ExtensionEntity();

        entity.setExtensionNumber(dto.getExtensionNumber());

        return entity;
    }

    public static ExtensionDTO toDTO(ExtensionEntity entity){
        ExtensionDTO dto = new ExtensionDTO();

        dto.setId(entity.getId());
        dto.setExtensionNumber(entity.getExtensionNumber());

        return dto;
    }
}
