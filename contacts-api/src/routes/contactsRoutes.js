import express from "express";
import { createContact, deleteContact, getAllContacts, getContactByID } from "../controllers/contactController.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactByID);
router.delete("/:id", deleteContact);

export default router;