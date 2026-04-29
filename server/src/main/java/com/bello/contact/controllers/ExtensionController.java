package com.bello.contact.controllers;

import com.bello.contact.dtos.ExtensionDTO;
import com.bello.contact.entities.ExtensionEntity;
import com.bello.contact.mappers.ExtensionMapper;
import com.bello.contact.services.ExtensionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/api/extensions")
public class ExtensionController {

    private final ExtensionService extensionService;

    public ExtensionController(ExtensionService extensionService){
        this.extensionService = extensionService;
    }

    @PostMapping
    public ResponseEntity<ExtensionDTO> add(@RequestBody ExtensionDTO dto){
        try {
            ExtensionDTO request = extensionService.saveExtension(dto);
            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(request.getId()).toUri();
            return ResponseEntity.created(uri).body(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<ExtensionDTO>> list(){
        List<ExtensionDTO> request = extensionService.findAll()
                .stream()
                .map(ExtensionMapper::toDTO)
                .toList();
        return ResponseEntity.ok(request);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ExtensionDTO> find(@PathVariable Long id){
        try {
            ExtensionDTO request = extensionService.findByIdExtension(id);
            return ResponseEntity.ok(request);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExtensionDTO> update(@RequestBody ExtensionDTO dto, @PathVariable Long id){
        try{
            ExtensionDTO request = extensionService.updateExtension(dto, id);
            return ResponseEntity.ok(request);
        }catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        try{
            extensionService.deleteExtension(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

}