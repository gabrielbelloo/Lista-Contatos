package com.bello.contact.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class ContactEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String position;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private DepartmentEntity department;

    @ManyToOne
    @JoinColumn(name = "extension_id")
    private ExtensionEntity extension;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PhoneEntity> phones;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<EmailEntity> emails;
}