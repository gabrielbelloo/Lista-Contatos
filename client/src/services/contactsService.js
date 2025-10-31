import api from "./api";

export const getContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
}

export const getContactById = async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
}

export const createContact = async (contact) => {
    const response = await api.post("/contacts", contact);
    return response.data;
}

export const deleteContact = async (contactId) => {
    const response = await api.delete(`/contacts/${contactId}`);
    return response.data;
}