import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post("/addWorkspace", services.workspaces.addWorkspace);

router.get("/", services.workspaces.getAllWorkspaces);

router.get("/:id", services.workspaces.getWorkspaceById);

router.patch("/:id", services.workspaces.editWorkspaceById);

router.delete("/:id", services.workspaces.deleteWorkspaceById);

export default router;
