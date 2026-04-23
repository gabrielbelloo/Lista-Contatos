package com.bello.contact.mappers;

import com.bello.contact.dtos.EmailDTO;
import com.bello.contact.entities.EmailEntity;

public class EmailMapper {

    public static EmailEntity toEntity(EmailDTO dto) {
        EmailEntity entity = new EmailEntity();

        entity.setEmailAddress(dto.getEmailAddress());
        entity.setType(dto.getType());

        return entity;
    }
}
