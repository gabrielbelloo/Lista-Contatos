package com.bello.contact.repositories;

import com.bello.contact.entities.ExtensionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExtensionRepository extends JpaRepository<ExtensionEntity, Long> {
    Optional<ExtensionEntity> findByExtensionNumber(String extensionNumber);
}
