import express from "express";

import services from "../services";

const router = express.Router();

router.post("/", services.roles.addRole);

router.get("/", services.roles.getAllRoles);

router.get("/:id", services.roles.getRoleById);

router.patch("/:id", services.roles.editRoleById);

router.delete("/:id", services.roles.deleteRoleById);

export default router;
