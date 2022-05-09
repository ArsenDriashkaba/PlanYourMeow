import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addWorkspace = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { name } = { ...req.body };
      const idOfUser = req.params.userId;
      const idOfRole = req.params.roleId;
      const userWorkspaceAsoc = req.context.models.userWorkspace;
      const userRoleAsoc = req.context.models.userRole;
      const workspaceUserRoleAsoc = req.context.models.workspaceUserRole;

      // New workspace creating
      const newWorkspace = await sequelize.models.workspace.create({
        name: name,
      });

      // adding user to the workspace
      await userWorkspaceAsoc.create({
        userId: idOfUser,
        workspaceId: newWorkspace.id,
      });

      // giving user role
      const userRoleForWorkspace = await userRoleAsoc.findOne({
        where: { userId: idOfUser, roleId: idOfRole },
      });

      if (!userRoleForWorkspace) {
        await userRoleAsoc.create({
          userId: idOfUser,
          roleId: idOfRole,
        });
      }

      await workspaceUserRoleAsoc.create({
        workspaceId: newWorkspace.id,
        userRoleId: userRoleForWorkspace.id,
      });

      res.status(200).send(newWorkspace);
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getAllWorkspaces = async (req, res) => {
  try {
    const workspaces = await req.context.models.workspace.findAll({
      include: [sequelize.models.user],
    });

    res.status(200).send(workspaces);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAllUserWorkspaces = async (req, res) => {
  try {
    const user = await req.context.models.user.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: req.context.models.workspace,
          include: { model: req.context.models.user },
        },
      ],
    });
    const workspaces = user.workspaces;

    res.status(200).send(workspaces);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    const models = req.context.models;
    const workspaceModel = models.workspace;
    const boardModel = models.board;
    const ticketModel = models.ticket;

    if (validationResults.isEmpty()) {
      const workspace = await workspaceModel.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: boardModel,
            include: [{ model: ticketModel }],
          },
        ],
        include: [
          {
            model: req.context.models.user,
          },
        ],
      });

      res.status(200).send(workspace);
    } else {
      res.send(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const editWorkspaceById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const workspaceId = req.params.id;
    const workspace = await req.context.models.workspace.findOne({
      where: { id: workspaceId },
    });

    if (workspace == null) {
      const workspaceNotFoundMsg = `Workspace with id "${workspaceId}" is not found...`;

      console.log(workspaceNotFoundMsg);
      res.status(404).send(workspaceNotFoundMsg);

      return;
    }

    const workspaceModel = await sequelize.models.workspace;

    await workspaceModel.update(req.body, { where: { id: workspaceId } });

    const successMsg = `You've succsesfully updated workspace with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteWorkspaceById = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    const userWorkspaceAsoc = req.context.models.userWorkspace;
    const workspaceUserRoleAsoc = req.context.models.workspaceUserRole;

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const workspaceId = req.params.id;
    const workspace = await req.context.models.workspace.findOne({
      where: { id: workspaceId },
    });

    if (workspace == null) {
      const workspaceNotFoundMsg = `Workspace with id "${workspaceId}" is not found...`;

      console.log(workspaceNotFoundMsg);
      res.status(404).send(workspaceNotFoundMsg);

      return;
    }

    const boardsOfWorkspace = await sequelize.models.board.findAll({
      where: { workspaceId: workspaceId },
    });

    boardsOfWorkspace.forEach(async (board) => {
      await sequelize.models.ticket.destroy({
        where: { boardId: board.id },
      });
    });

    await sequelize.models.board.destroy({
      where: { workspaceId: req.params.id },
    });

    await sequelize.models.workspace.destroy({ where: { id: workspaceId } });

    // Deleting user-workspace association
    await userWorkspaceAsoc.destroy({
      where: { workspaceId: workspaceId },
    });

    // Deleting workspace-role-user association
    await workspaceUserRoleAsoc.destroy({
      where: { workspaceId: workspaceId },
    });

    const successMsg = `You've succsesfully deleted workspace with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {
  addWorkspace,
  getAllWorkspaces,
  getAllUserWorkspaces,
  getWorkspaceById,
  editWorkspaceById,
  deleteWorkspaceById,
};
