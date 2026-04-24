package com.bello.contact.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contacts")
public class ContactEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String position;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "department_id", nullable = false)
    private DepartmentEntity department;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "extension_id", nullable = false)
    private ExtensionEntity extension;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PhoneEntity> phones = new ArrayList<>();

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EmailEntity> emails = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public DepartmentEntity getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentEntity department) {
        this.department = department;
    }

    public ExtensionEntity getExtension() {
        return extension;
    }

    public void setExtension(ExtensionEntity extension) {
        this.extension = extension;
    }

    public List<PhoneEntity> getPhones() {
        return phones;
    }

    public void setPhones(List<PhoneEntity> phones) {
        this.phones = phones;
    }

    public List<EmailEntity> getEmails() {
        return emails;
    }

    public void setEmails(List<EmailEntity> emails) {
        this.emails = emails;
    }
}