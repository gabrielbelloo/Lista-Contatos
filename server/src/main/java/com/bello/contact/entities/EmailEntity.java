package com.bello.contact.entities;

import com.bello.contact.enums.EmailType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
public class EmailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String emaiAddress;

    @Enumerated(EnumType.STRING)
    private EmailType type;

    @ManyToOne
    @JoinColumn(name = "contact_id")
    @JsonBackReference
    private ContactEntity contact;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmaiAddress() {
        return emaiAddress;
    }

    public void setEmaiAddress(String emaiAddress) {
        this.emaiAddress = emaiAddress;
    }

    public EmailType getType() {
        return type;
    }

    public void setType(EmailType type) {
        this.type = type;
    }

    public ContactEntity getContact() {
        return contact;
    }

    public void setContact(ContactEntity contact) {
        this.contact = contact;
    }
}