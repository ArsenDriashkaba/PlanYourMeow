import express from "express";

import services from "../services";

const router = express.Router();

router.post("/", services.users.addUser);

router.post("/login", services.users.loginHandler);

router.get("/login", services.users.getLoginStatus);

router.get("/userAuth", services.users.getAuthInfo);

router.get("/:id", services.users.getUserById);

router.get("/", services.users.getAllUsers);

router.delete("/:id", services.users.deleteUserById);

router.patch("/:id", services.users.editUserDataById);

export default router;
