import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addWorkspace = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { name, userId } = { ...req.body };

      const newWorkspace = await sequelize.models.workspace.create({
        name: name,
        userId: userId,
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
    const workspaces = await req.context.models.workspace.findAll();

    res.status(200).send(workspaces);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getWorkspaceById = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    if (validationResults.isEmpty()) {
      const workspace = await req.context.models.workspace.findOne({
        where: { id: req.params.id },
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

    await workspaceModel.update(
      {
        name: req.body.name,
      },
      { where: { id: workspaceId } }
    );

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

    await sequelize.models.workspace.destroy({ where: { id: workspaceId } });

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
  getWorkspaceById,
  editWorkspaceById,
  deleteWorkspaceById,
};
