import express from "express";
import verifyAuth from "../services/helpers/verifyToken";

import services from "../services";

const router = express.Router();

router.post("/", services.workspaces.addWorkspace);

router.get("/", verifyAuth, services.workspaces.getAllWorkspaces);

router.get("/:id", services.workspaces.getWorkspaceById);

router.patch("/:id", services.workspaces.editWorkspaceById);

router.delete("/:id", services.workspaces.deleteWorkspaceById);

export default router;
