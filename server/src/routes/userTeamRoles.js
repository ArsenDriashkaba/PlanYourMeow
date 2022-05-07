import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post("/addRoleToUserInTeam", services.userTeamRoles.addRoleToUserInTeam);

router.get("/", services.userTeamRoles.getAllUserTeamRoles);

router.get("/:id", services.userTeamRoles.getAllUserTeamRoleByWorkspaceId);

router.patch("/:id", services.userTeamRoles.editUserTeamRoleById);

router.delete("/:id", services.userTeamRoles.deleteUserTeamRoleById);

export default router;
