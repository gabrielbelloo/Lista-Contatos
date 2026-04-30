package com.bello.contact.dtos;

import com.bello.contact.enums.EmailType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class EmailDTO {
    private Long id;

    @NotBlank(message = "emailAddress must not be blank")
    @Email(message = "emailAddress must be valid")
    @Size(max = 100, message = "emailAddress must be at most 100 characters")
    private String emailAddress;

    @NotNull(message = "type must not be null")
    private EmailType type;

    private Long contactId;

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

    public Long getContactId() {
        return contactId;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }
}
