package com.bello.contact.dtos;

import com.bello.contact.enums.PhoneType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class PhoneDTO {
    private Long id;

    @NotBlank(message = "phoneNumber must not be blank")
    @Size(max = 20, message = "phoneNumber must be at most 20 characters")
    private String phoneNumber;

    @NotNull(message = "type must not be null")
    private PhoneType type;

    private Long contactId;

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

    public Long getContactId() {
        return contactId;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }
}
