package com.bello.contact.mappers;

import com.bello.contact.dtos.ContactDTO;
import com.bello.contact.entities.ContactEntity;
import com.bello.contact.entities.DepartmentEntity;
import com.bello.contact.entities.ExtensionEntity;

public class ContactMapper {

    public static ContactEntity toEntity(ContactDTO dto, DepartmentEntity department, ExtensionEntity extension) {
        ContactEntity entity = new ContactEntity();

        entity.setName(dto.getName());
        entity.setPosition(dto.getPosition());
        entity.setDepartment(department);
        entity.setExtension(extension);

        if (dto.getPhones() != null) {
            entity.setPhones(
                    dto.getPhones().stream()
                            .map(PhoneMapper::toEntity)
                            .toList()
            );
        }

        if (dto.getEmails() != null) {
            entity.setEmails(
                    dto.getEmails().stream()
                            .map(EmailMapper::toEntity)
                            .toList()
            );
        }

        return entity;
    }

    public static ContactDTO toDTO(ContactEntity entity) {
        ContactDTO dto = new ContactDTO();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPosition(entity.getPosition());

        if (entity.getDepartment() != null) {
            dto.setDepartmentId(entity.getDepartment().getId());
        }

        if (entity.getExtension() != null) {
            dto.setExtensionId(entity.getExtension().getId());
        }

        return dto;
    }
}
