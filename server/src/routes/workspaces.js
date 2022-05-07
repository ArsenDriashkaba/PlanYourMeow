import express from "express";
import verifyAuth from "../services/helpers/verifyToken";

import services from "../services";

const router = express.Router();

router.post("/:userId/:roleId", verifyAuth, services.workspaces.addWorkspace);

router.get("/", verifyAuth, services.workspaces.getAllWorkspaces);

router.get("/user/:id", verifyAuth, services.workspaces.getAllUserWorkspaces);

router.get("/:id", verifyAuth, services.workspaces.getWorkspaceById);

router.patch("/:id", services.workspaces.editWorkspaceById);

router.delete("/:id", verifyAuth, services.workspaces.deleteWorkspaceById);

export default router;
