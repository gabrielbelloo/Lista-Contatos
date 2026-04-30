package com.bello.contact.controllers;

import com.bello.contact.dtos.ContactCreateDTO;
import com.bello.contact.dtos.ContactResponseDTO;
import com.bello.contact.mappers.ContactMapper;
import com.bello.contact.services.ContactService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.*;

@RestController
@RequestMapping(path = "/api/contacts")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<ContactResponseDTO> add(@RequestBody @Valid ContactCreateDTO dto){
        try {
            ContactResponseDTO response = contactService.saveContact(dto);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(response.getId()).toUri();
            return ResponseEntity.created(uri).body(response);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ContactResponseDTO>> list(){
        List<ContactResponseDTO> response = contactService.findAllContacts();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> find(@PathVariable Long id){
        try {
            ContactResponseDTO response = contactService.findByIdContact(id);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponseDTO> update(@RequestBody @Valid ContactCreateDTO dto, @PathVariable Long id){
        try {
            ContactResponseDTO response = contactService.updateContact(dto, id);
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        try {
            contactService.deleteContact(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}