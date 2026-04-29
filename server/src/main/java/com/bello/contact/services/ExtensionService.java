package com.bello.contact.services;

import com.bello.contact.dtos.ExtensionDTO;
import com.bello.contact.entities.ExtensionEntity;
import com.bello.contact.mappers.ExtensionMapper;
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

    public ExtensionDTO saveExtension(ExtensionDTO dto){
        ExtensionEntity extension = ExtensionMapper.toEntity(dto);
        if (extensionRepository.findByExtensionNumber(extension.getExtensionNumber()).isPresent()){
            throw new RuntimeException("extension already exists");
        }
        return ExtensionMapper.toDTO(extensionRepository.save(extension));
    }

    public List<ExtensionEntity> findAll(){
        return extensionRepository.findAll();
    }

    public ExtensionDTO findByIdExtension(Long id){
        return ExtensionMapper.toDTO(extensionRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("extension not found")));
    }

    public ExtensionDTO updateExtension(ExtensionDTO dto, Long id){
        ExtensionEntity entity = ExtensionMapper.toEntity(findByIdExtension(id));

        entity.setExtensionNumber(dto.getExtensionNumber());

        return ExtensionMapper.toDTO(extensionRepository.save(entity));
    }

    public void deleteExtension(Long id){
        if (!extensionRepository.existsById(id)){
            throw new EntityNotFoundException("extension not found");
        }
        extensionRepository.deleteById(id);
    }
}