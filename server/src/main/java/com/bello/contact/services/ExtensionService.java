package com.bello.contact.services;

import com.bello.contact.entities.ExtensionEntity;
import com.bello.contact.repositories.ExtensionRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExtensionService {

    private final ExtensionRepository extensionRepository;

    public ExtensionService(ExtensionRepository extensionRepository) {
        this.extensionRepository = extensionRepository;
    }

    public ExtensionEntity saveExtension(ExtensionEntity extension){
        if (extensionRepository.findByExtensionNumber(extension.getExtensionNumber()).isPresent()){
            throw new RuntimeException("extension already exists");
        }
        return extensionRepository.save(extension);
    }

    public List<ExtensionEntity> findAll(){
        return extensionRepository.findAll();
    }

    public ExtensionEntity findByIdExtension(Long id){
        return extensionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("extension not found"));
    }

    public ExtensionEntity updateExtension(ExtensionEntity extension, Long id){
        ExtensionEntity entity = extensionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("extension not found"));

        entity.setExtensionNumber(extension.getExtensionNumber());

        return extensionRepository.save(entity);
    }

    public void deleteExtension(Long id){
        if (!extensionRepository.existsById(id)){
            throw new EntityNotFoundException("extension not found");
        }
        extensionRepository.deleteById(id);
    }
}