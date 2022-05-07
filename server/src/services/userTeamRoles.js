import { validationResult } from "express-validator";

const addRoleToUserInTeam = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { workspaceId, roleId, userId } = { ...req.body };

      const newUserTeamRole = await sequelize.models.userTeamRole.create({
        user_id: userId,
        workspace_id: workspaceId,
        role_id: roleId,
      });

      res.status(200).send(newUserTeamRole);
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
  //TODO:
  try {
    const userWorkspaceRoles =
      await req.context.models.workspaceUserRole.findAll({
        where: {
          workspaceId: req.params.workspaceId,
        },
      });

    const userRoles = userWorkspaceRoles.map(async (element) => {
      const userRole = await req.context.models.userRole.findOne({
        where: { id: element.userRoleId },
      });

      return userRole;
    });

    const userRoleIdx = userRoles.filter((elem) => {
      console.log("------->", elem);
      elem.userId.toString() == req.params.userId.toString();
    });

    const role = await req.context.models.role.findOne({
      where: { id: userRolesFiltered[0].roleId },
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
