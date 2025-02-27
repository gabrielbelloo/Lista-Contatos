import pool from "../config/db.js";

export const getAllUsersService = async () => {;
    const result = await pool.query("SELECT * FROM contatos");
    return result.rows;
};
export const getUserByIdService = async (id) => {
    const result = await pool.query("SELECT * FROM contatos WHERE id = $1", [id]);
    return result.rows[0];
};
export const createUserService = async (nome, setor, ramal, email, telefone) => {
    const result = await pool.query(
    "INSERT INTO contatos (nome, setor, ramal, email, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *", [nome, setor, ramal, email, telefone]);
    return result.rows[0];
};
export const updateUserService = async (id, nome, setor, ramal, email, telefone) => {
    const result = await pool.query(
    "UPDATE contatos SET nome = $1, setor = $2, ramal = $3, email = $4, telefone = $5 WHERE id = $6 RETURNING *",
    [nome, setor, ramal, email, telefone, id]
    );
    return result.rows[0];
};
export const deleteUserService = async (id) => {
    const result = await pool.query("DELETE FROM contatos WHERE id = $1 RETURNING *", [id]

    );
    return result.rows[0];

};