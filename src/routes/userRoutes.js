import express from "express";
import { createUser, deleteUser, getAllUsers, getUserByID, updateUser } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;