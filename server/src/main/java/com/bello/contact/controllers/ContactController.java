package com.bello.contact.controllers;

import com.bello.contact.dtos.ContactDTO;
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
    public ResponseEntity<ContactDTO> add(@RequestBody @Valid ContactDTO dto){
        try {
            ContactDTO request = contactService.saveContact(dto);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(request.getId()).toUri();
            return ResponseEntity.created(uri).body(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ContactDTO>> list(){
        List<ContactDTO> request = contactService.findAllContacts()
                .stream()
                .map(ContactMapper::toDTO)
                .toList();
        return ResponseEntity.ok(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactDTO> find(@PathVariable Long id){
        try {
            ContactDTO request = contactService.findByIdContact(id);
            return ResponseEntity.ok(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactDTO> update(@RequestBody @Valid ContactDTO dto, @PathVariable Long id){
        try {
            ContactDTO request = contactService.updateContact(dto, id);
            return ResponseEntity.ok(request);
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