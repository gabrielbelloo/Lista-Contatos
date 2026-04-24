package com.bello.contact.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "extensions")
public class ExtensionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String extensionNumber;

    @OneToMany(mappedBy = "extension", fetch = FetchType.LAZY)
    private List<ContactEntity> contacts;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getExtensionNumber() {
        return extensionNumber;
    }

    public void setExtensionNumber(String extensionNumber) {
        this.extensionNumber = extensionNumber;
    }

    public List<ContactEntity> getContacts() {
        return contacts;
    }

    public void setContacts(List<ContactEntity> contacts) {
        this.contacts = contacts;
    }
}