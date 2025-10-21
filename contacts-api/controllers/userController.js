import { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService } from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    });
};

export const createUser = async (req, res, next) => {
    const { nome, setor, ramal, email, telefone } = req.body;
    try {
        const newUser = await createUserService(nome, setor, ramal, email, telefone);
        handleResponse(res, 201, 'Contato criado com sucesso', newUser);
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, 'Usuários recuperados com sucesso', users);
    } catch (err) {
        next(err);
    }
};

export const getUserByID = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if(!user) return handleResponse(res,404, "Usuário não encontrado");
        handleResponse(res, 200, 'Usuários recuperados com sucesso', user);
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (req, res, next) => {
    const { nome, setor, ramal, email, telefone } = req.body;
    try {
        const updatedUser = await updateUserService(req.params.id, nome, setor, ramal, email, telefone);
        if(!updatedUser) return handleResponse(res,404, "Usuário não encontrado");
        handleResponse(res, 200, 'Usuários recuperados com sucesso', updatedUser);
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if(!deletedUser) return handleResponse(res,404, "Usuário não encontrado");
        handleResponse(res, 200, 'Usuário deletado com sucesso', deleteUser);
    } catch (err) {
        next(err);
    }
};