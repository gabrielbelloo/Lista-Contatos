package com.bello.contact.mappers;

import com.bello.contact.dtos.ContactCreateDTO;
import com.bello.contact.dtos.ContactResponseDTO;
import com.bello.contact.entities.*;

public class ContactMapper {

    public static ContactEntity toEntity(ContactCreateDTO dto, DepartmentEntity department, ExtensionEntity extension) {
        ContactEntity entity = new ContactEntity();

        entity.setName(dto.getName());
        entity.setPosition(dto.getPosition());
        entity.setDepartment(department);
        entity.setExtension(extension);

        if (dto.getPhones() != null) {
            entity.setPhones(
                    dto.getPhones().stream()
                            .map(p -> {
                                PhoneEntity phone = PhoneMapper.toEntity(p);
                                phone.setContact(entity);
                                return phone;
                            })
                            .toList()
            );
        }

        if (dto.getEmails() != null) {
            entity.setEmails(
                    dto.getEmails().stream()
                            .map(e -> {
                                EmailEntity email = EmailMapper.toEntity(e);
                                email.setContact(entity);
                                return email;
                            })
                            .toList()
            );
        }

        return entity;
    }

    public static ContactResponseDTO toDTO(ContactEntity entity){
        ContactResponseDTO dto = new ContactResponseDTO();

        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setPosition(entity.getPosition());

        dto.setDepartmentName(entity.getDepartment() != null
                                ? entity.getDepartment().getName()
                                : null
        );

        dto.setExtensionNumber(entity.getExtension() != null
                                ? entity.getExtension().getExtensionNumber()
                                :null
        );

        if (entity.getPhones() != null){
            dto.setPhones(
                    entity.getPhones().stream()
                            .map(PhoneMapper::toDTO)
                            .toList()
            );
        }

        if (entity.getEmails() != null){
            dto.setEmails(
                    entity.getEmails().stream()
                            .map(EmailMapper::toDTO)
                            .toList()
            );
        }

        return dto;
    }

    public static void updateEntity(ContactEntity entity, ContactCreateDTO dto, DepartmentEntity department, ExtensionEntity extension){
        entity.setName(dto.getName());
        entity.setPosition(dto.getPosition());
        entity.setDepartment(department);
        entity.setExtension(extension);

        entity.getPhones().clear();
        dto.getPhones().forEach(p -> {
            PhoneEntity phone = PhoneMapper.toEntity(p);
            phone.setContact(entity);
            entity.getPhones().add(phone);
        });

        entity.getEmails().clear();
        dto.getEmails().forEach(e -> {
            EmailEntity email = EmailMapper.toEntity(e);
            email.setContact(entity);
            entity.getEmails().add(email);
        });
    }
}
