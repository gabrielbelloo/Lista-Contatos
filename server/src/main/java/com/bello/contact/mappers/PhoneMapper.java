package com.bello.contact.mappers;

import com.bello.contact.dtos.PhoneDTO;
import com.bello.contact.entities.PhoneEntity;

public class PhoneMapper {
    public static PhoneEntity toEntity(PhoneDTO dto){
        PhoneEntity entity = new PhoneEntity();

        entity.setPhoneNumber(dto.getPhoneNumber());
        entity.setType(dto.getType());

        return entity;
    }

    public static PhoneDTO toDTO(PhoneEntity entity){
        PhoneDTO dto = new PhoneDTO();

        if (entity.getContact() != null){
            dto.setContactId(entity.getContact().getId());
        }

        dto.setId(entity.getId());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setType(entity.getType());

        return dto;
    }
}
