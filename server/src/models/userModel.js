import pool from "../config/db.js";

export const getAllUsersService = async () => {;
    const result = await pool.query("SELECT * FROM contacts");
    return result.rows;
};

export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [id]);
    return result.rows[0];
};

export const createUserService = async (name, position, department_id, extension_id) => {
    const result = await pool.query(
    "INSERT INTO contacts (name, position, department_id, extension_id) VALUES ($1, $2, $3, $4) RETURNING *", [name, position, department_id, extension_id]);
    return result.rows[0];
};

export const updateUserService = async (id, name, position, department_id, extension_id) => {
    const result = await pool.query(
    "UPDATE contatos SET name = $1, position = $2, department_id = $3, extension_id = $4 WHERE id = $6 RETURNING *",
    [name, position, department_id, extension_id, id]
    );
    return result.rows[0];
};

export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM contacts WHERE id = $1 RETURNING *", [id]

    );
    return result.rows[0];
};