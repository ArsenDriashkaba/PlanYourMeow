import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post("/", services.users.addUser);

router.get("/", services.users.getAllUsers);

router.delete("/:id", services.users.deleteUserById);

router.patch("/:id", services.users.editUserDataById);

export default router;
