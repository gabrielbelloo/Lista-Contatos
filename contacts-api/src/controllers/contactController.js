import pool from "../config/db.js";

export const createContact = async (req, res) => {
    const { name, position, department_id, extension_id, emails, phones } = req.body;

    if (!name || !position) {
        return res.status(400).json({ message: "Nome e cargo são obrigatórios" });
    }

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [contactResult] = await connection.query(
            "INSERT INTO contacts (name, position, department_id, extension_id) VALUES (?, ?, ?, ?)",
            [name, position, department_id || NULL, extension_id || null]
        );
        const contactId = contactResult.insertId;

        if (emails && emails.length > 0) {
            for (const email of emails) {
                await connection.query(
                    "INSERT INTO emails (contact_id, email_address, type) VALUES (?, ?, ?)",
                    [contactId, email.email_address, email.type]
                );
            }
        }


        if (phones && phones.length > 0) {
            for (const phone of phones) {
                await connection.query(
                    "INSERT INTO phones (contact_id, phone_number, type) VALUES (?, ?, ?)",
                    [contactId, phone.phone_number, phone.type]
                );
            }
        }
        await connection.commit();
        res.status(201).json({ message: "Contato criado com sucesso", contactId });

    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ message: "Erro ao criar contato" });
    } finally {
        connection.release();
    }
}


export const getAllContacts = async (req, res) => {
    try {
        const [contacts] = await pool.query(`
            SELECT
            c.id, c.name, c.position, c.created_at,
            d.name AS department_name,
            e.extension_number,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'phone_number', p.phone_number, 'type', p.type))
            FROM phones p WHERE p.contact_id = c.id) AS phones,
            (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', em.id, 'email_address', em.email_address, 'type', em.type))
            FROM emails em WHERE em.contact_id = c.id) AS emails
            FROM contacts c
            LEFT JOIN departments d ON c.department_id = d.id
            LEFT JOIN extensions e ON c.extension_id = e.id
            ORDER BY c.name ASC`);

        res.json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao buscar contatos" });
    }
}

export const getContactByID = async (req, res) => {
  const { id } = req.params;

  try {
    const [contacts] = await pool.query(`
      SELECT 
        c.id, c.name, c.position, c.created_at,
        d.name AS department_name,
        e.extension_number,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', p.id, 'phone_number', p.phone_number, 'type', p.type))
         FROM phones p WHERE p.contact_id = c.id) AS phones,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', em.id, 'email_address', em.email_address, 'type', em.type))
         FROM emails em WHERE em.contact_id = c.id) AS emails
      FROM contacts c
      LEFT JOIN departments d ON c.department_id = d.id
      LEFT JOIN extensions e ON c.extension_id = e.id
      WHERE c.id = ?
    `, [id]);

    if (contacts.length === 0) return res.status(404).json({ message: "Contato não encontrado." });

    res.json(contacts[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar contato." });
  }
};

/* update */

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query("DELETE FROM contacts WHERE id = ?", [ id ]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Contato não encontrado" });
        }
        res.json({ message: "Contato deletado com sucesso" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar contato" });
    }
}