import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addRoleToUserInTeam = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { workspaceId, roleId, userId } = { ...req.body };
      const userWorkspaceAsoc = req.context.models.userWorkspace;
      const userRoleAsoc = req.context.models.userRole;
      const workspaceUserRoleAsoc = req.context.models.workspaceUserRole;

      // adding user to the workspace
      await userWorkspaceAsoc.create({
        userId: userId,
        workspaceId: workspaceId,
      });

      // giving user role
      const userRoleForWorkspace = await userRoleAsoc.findOne({
        where: { userId: userId, roleId: roleId },
      });

      if (!userRoleForWorkspace) {
        const userRoleWorkspace = await userRoleAsoc.create({
          userId: userId,
          roleId: roleId,
        });

        await workspaceUserRoleAsoc.create({
          workspaceId: workspaceId,
          userRoleId: userRoleWorkspace.id,
        });
      } else {
        await workspaceUserRoleAsoc.create({
          workspaceId: workspaceId,
          userRoleId: userRoleForWorkspace.id,
        });
      }

      res
        .status(200)
        .send(
          `User with id "${userId} " have been added to the team with id "${workspaceId}"`
        );
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getUserWorkspaceRole = async (req, res) => {
  try {
    const userWorkspaceRoles = await sequelize.models.workspace.findAll({
      where: {
        id: req.params.workspaceId,
      },
      include: [
        {
          model: sequelize.models.userRole,
          where: { userId: req.params.userId },
        },
      ],
    });

    res.status(200).send(userWorkspaceRoles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAllUserTeamRoles = async (req, res) => {
  try {
    const userTeamRoles = await req.context.models.userTeamRole.findAll();

    res.status(200).send(userTeamRoles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAllUserTeamRoleByWorkspaceId = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    const models = req.context.models;
    const userTeamRoleModel = models.userTeamRole;

    if (validationResults.isEmpty()) {
      const userTeamRoles = await userTeamRoleModel.findAll({
        where: { workspaceId: req.params.id },
      });

      res.status(200).send(userTeamRoles);
    } else {
      res.send(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const editUserTeamRoleById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const userTeamRoleModel = await sequelize.models.userTeamRole;
    const userTeamRoleID = req.params.id;
    const userTeamRole = await userTeamRoleModel.findOne({
      where: { id: userTeamRoleID },
    });

    if (userTeamRole == null) {
      const notFoundMsg = `UserTeamRole with id "${userTeamRoleID}" is not found...`;

      console.log(notFoundMsg);
      res.status(404).send(notFoundMsg);

      return;
    }

    await userTeamRoleModel.update(req.body, { where: { id: userTeamRoleID } });

    const successMsg = `You've succsesfully updated userTeamRole with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUserTeamRoleById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const userTEamRoleId = req.params.id;
    const userTeamRole = await req.context.models.userTeamRole.findOne({
      where: { id: userTEamRoleId },
    });

    if (userTeamRole == null) {
      const notFoundMsg = `UserTeamRole with id "${userTEamRoleId}" is not found...`;

      res.status(404).send(notFoundMsg);

      return;
    }

    await sequelize.models.userTeamRole.destroy({
      where: { id: userTEamRoleId },
    });

    const successMsg = `You've succsesfully deleted userTeamRole with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {
  addRoleToUserInTeam,
  getAllUserTeamRoles,
  getAllUserTeamRoleByWorkspaceId,
  editUserTeamRoleById,
  deleteUserTeamRoleById,
  getUserWorkspaceRole,
};
