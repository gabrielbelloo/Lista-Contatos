package com.bello.contact.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class ContactDTO {
    private Long id;

    @NotBlank(message = "name must not be blank")
    @Size(max = 100, message = "name must be at most 100 characters")
    private String name;

    @NotBlank(message = "position must not be blank")
    @Size(max = 100, message = "name must be at most 100 characters")
    private String position;

    @NotNull(message = "departmentId must not be null")
    private Long departmentId;

    @NotNull(message = "extensionId must not be null")
    private Long extensionId;

    @NotNull(message = "phones must not be null")
    @Size(min = 1, message = "at least one phone is required")
    private List<PhoneDTO> phones;

    @NotNull(message = "emails must not be null")
    @Size(min = 1, message = "at least one email is required")
    private List<EmailDTO> emails;

    public Long getId() {
        return id;
    }

    public void setId(Long id){
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

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getExtensionId() {
        return extensionId;
    }

    public void setExtensionId(Long extensionId) {
        this.extensionId = extensionId;
    }

    public List<PhoneDTO> getPhones() {
        return phones;
    }

    public void setPhones(List<PhoneDTO> phones) {
        this.phones = phones;
    }

    public List<EmailDTO> getEmails() {
        return emails;
    }

    public void setEmails(List<EmailDTO> emails) {
        this.emails = emails;
    }
}
