import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post("/addUser", services.users.addUser);

router.get("/", services.users.getAllUsers);

router.delete("/:id", services.users.deleteUserById);

export default router;
