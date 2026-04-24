package com.bello.contact.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ExtensionDTO {

    @NotBlank(message = "extensionNumber must not be blank")
    @Size(max = 20, message = "extensionNumber must be at most 20 characters")
    private String extensionNumber;

    public String getExtensionNumber() {
        return extensionNumber;
    }

    public void setExtensionNumber(String extensionNumber) {
        this.extensionNumber = extensionNumber;
    }
}