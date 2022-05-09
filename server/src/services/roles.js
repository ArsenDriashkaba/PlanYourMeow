import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addRole = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const newRole = await sequelize.models.role.create({
        name: req.body.name,
      });

      res.status(200).send(newRole);
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await req.context.models.role.findAll();

    res.status(200).send(roles);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getRoleById = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    const models = req.context.models;
    const roleModel = models.role;

    if (validationResults.isEmpty()) {
      const role = await roleModel.findOne({
        where: { id: req.params.id },
      });

      res.status(200).send(role);
    } else {
      res.send(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const editRoleById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const roleModel = await sequelize.models.role;
    const roleId = req.params.id;
    const role = await roleModel.findOne({
      where: { id: roleId },
    });

    if (role == null) {
      const notFoundMsg = `Role with id "${roleId}" is not found...`;

      console.log(notFoundMsg);
      res.status(404).send(notFoundMsg);

      return;
    }

    await roleModel.update(req.body, { where: { id: roleId } });

    const successMsg = `You've succsesfully updated role with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteRoleById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const roleId = req.params.id;
    const role = await req.context.models.role.findOne({
      where: { id: roleId },
    });

    if (role == null) {
      const notFoundMsg = `Role with id "${roleId}" is not found...`;

      res.status(404).send(notFoundMsg);

      return;
    }

    await sequelize.models.role.destroy({
      where: { id: roleId },
    });

    const successMsg = `You've succsesfully deleted role with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {
  addRole,
  getAllRoles,
  getRoleById,
  editRoleById,
  deleteRoleById,
};
