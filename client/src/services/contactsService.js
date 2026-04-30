import api from "./api";

export const getContacts = async () => {
    const response = await api.get("/api/contacts");
    return response.data;
}

export const getContactById = async (id) => {
    const response = await api.get(`/api/contacts/${id}`);
    return response.data;
}

export const createContact = async (contact) => {
    const response = await api.post("/api/contacts", contact);
    return response.data;
}

export const updateContact = async (id, contact) => {
    const response = await api.put(`/api/contacts/${id}`, contact);
    return response.data;
}

export const deleteContact = async (id) => {
    const response = await api.delete(`/api/contacts/${id}`);
    return response.data;
}