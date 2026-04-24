package com.bello.contact.entities;

import com.bello.contact.enums.EmailType;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "emails")
public class EmailEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Email
    @NotBlank
    private String emailAddress;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmailType type;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "contact_id", nullable = false)
    private ContactEntity contact;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
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