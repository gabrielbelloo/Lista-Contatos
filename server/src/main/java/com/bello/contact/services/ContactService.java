package com.bello.contact.services;

import com.bello.contact.dtos.ContactDTO;
import com.bello.contact.entities.ContactEntity;
import com.bello.contact.entities.DepartmentEntity;
import com.bello.contact.entities.ExtensionEntity;
import com.bello.contact.mappers.ContactMapper;
import com.bello.contact.repositories.ContactRepository;
import com.bello.contact.repositories.DepartmentRepository;
import com.bello.contact.repositories.ExtensionRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;
    private final DepartmentRepository departmentRepository;
    private final ExtensionRepository extensionRepository;

    public ContactService(ContactRepository contactRepository, DepartmentRepository departmentRepository, ExtensionRepository extensionRepository) {
        this.contactRepository = contactRepository;
        this.departmentRepository = departmentRepository;
        this.extensionRepository = extensionRepository;
    }

    @Transactional
    public ContactDTO saveContact(ContactDTO dto){
        DepartmentEntity department = departmentRepository.findById(dto.getDepartmentId())
                            .orElseThrow(() -> new EntityNotFoundException("department not found"));
        ExtensionEntity extension = extensionRepository.findById(dto.getExtensionId())
                            .orElseThrow(() -> new EntityNotFoundException("extension not found"));

        ContactEntity contact = ContactMapper.toEntity(dto, department, extension);

        contact.getPhones().forEach(phone -> phone.setContact(contact));
        contact.getEmails().forEach(email -> email.setContact(contact));

        return ContactMapper.toDTO(contactRepository.save(contact));
    }

    public List<ContactEntity> findAllContacts(){
        return contactRepository.findAll();
    }

    public ContactDTO findByIdContact(Long id){
        return ContactMapper.toDTO(contactRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("contact not found")));
    }

    @Transactional
    public ContactDTO updateContact(ContactDTO dto, Long id){
        ContactEntity contact = contactRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("contact not found"));

        DepartmentEntity department = departmentRepository.findById(dto.getDepartmentId())
                            .orElseThrow(() -> new EntityNotFoundException("department not found"));
        ExtensionEntity extension = extensionRepository.findById(dto.getExtensionId())
                            .orElseThrow(() -> new EntityNotFoundException("extension not found"));

        ContactMapper.updateEntity(contact, dto, department, extension);

        return ContactMapper.toDTO(contactRepository.save(contact));
    }

    @Transactional
    public void deleteContact(Long id){
        if (!contactRepository.existsById(id)){
            throw new EntityNotFoundException("contact not found");
        }
        contactRepository.deleteById(id);
    }
}