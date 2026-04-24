package com.bello.contact.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class DepartmentDTO {

    @NotBlank(message = "name must not be blank")
    @Size(max = 100, message = "name must be at most 100 characters")
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
