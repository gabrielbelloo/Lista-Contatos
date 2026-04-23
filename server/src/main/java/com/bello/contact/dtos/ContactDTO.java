package com.bello.contact.dtos;

import java.util.List;

public class ContactDTO {
    private Long id;
    private String name;
    private String position;
    private Long departmentId;
    private Long extensionId;
    private List<PhoneDTO> phones;
    private List<EmailDTO> emails;

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
