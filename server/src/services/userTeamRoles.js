import { validationResult } from "express-validator";
import { database } from "../..";

const addRoleToUserInTeam = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const userId = req.body.userId;
      const workspaceId = req.body.workspaceId;
      const roleId = req.body.roleId;

      database.query(
        `INSERT INTO users (user_id, workspace_id, role_id) VALUES (?, ?, ?)`,
        [userId, workspaceId, roleId],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(result);
          }
        }
      );
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    req.log.error(error);
    res.status(500).send("Error!");
  }
};

const getAllUserTeamRoles = async (req, res) => {
  try {
    req.log.info("Success");
    res.status(200).send("Hello");
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
};

const getUserTeamRoleById = async (req, res) => {};

const editUserTeamRoleById = async (req, res) => {};

const deleteUserTeamRoleById = async (req, res) => {
  try {
    const successMsg = `You've succsesfully deleted blog with id: ${req.params.id}`;

    req.log.info(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
};

export default {
  addRoleToUserInTeam,
  getAllUserTeamRoles,
  getUserTeamRoleById,
  editUserTeamRoleById,
  deleteUserTeamRoleById,
};
