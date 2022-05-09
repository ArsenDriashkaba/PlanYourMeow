import express from "express";

import services from "../services";

const router = express.Router();

router.post("/", services.userTeamRoles.addRoleToUserInTeam);

router.get("/", services.userTeamRoles.getAllUserTeamRoles);

router.get(
  "/:userId/:workspaceId",
  services.userTeamRoles.getUserWorkspaceRole
);

router.get("/:id", services.userTeamRoles.getAllUserTeamRoleByWorkspaceId);

router.patch("/:id", services.userTeamRoles.editUserTeamRoleById);

router.delete(
  "/:workspaceId/:roleId/:userId",
  services.userTeamRoles.deleteUserFromWorkspace
);

router.delete("/:id", services.userTeamRoles.deleteUserTeamRoleById);

export default router;
