package com.bello.contact.entities;

import com.bello.contact.enums.PhoneType;

import jakarta.persistence.*;

@Entity
@Table(name = "phones")
public class PhoneEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PhoneType type;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contact_id", nullable = false)
    private ContactEntity contact;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public PhoneType getType() {
        return type;
    }

    public void setType(PhoneType type) {
        this.type = type;
    }

    public ContactEntity getContact() {
        return contact;
    }

    public void setContact(ContactEntity contact) {
        this.contact = contact;
    }
}