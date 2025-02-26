import express from "express";
import { createUser, deleteUser, getAllUsers, getUserByID, updateUser } from "../controllers/userController";

const router = express.Router();

router.post("/contatos", createUser);
router.get("/contatos/:id", getAllUsers);
router.get("/contatos/:id", getUserByID);
router.put("/contatos/:id", updateUser);
router.delete("/contatos/:id", deleteUser);

export default router;