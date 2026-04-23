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
}
