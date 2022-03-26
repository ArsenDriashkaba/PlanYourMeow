import { sanitize, validationResult } from "express-validator";
import { database } from "../..";

const addTicket = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const name = req.body.name;
      const description = req.body.description;
      const deadline = req.body.deadline;
      const boardId = req.body.boardId;
      const label = req.body.label;
      const idOfAssignedUser = req.body.idOfAssignedUser;
      const state = req.body.state;

      database.query(
        `INSERT INTO users (name, description, deadline, board_id, label, id_of_assigned_user, state) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, deadline, boardId, label, idOfAssignedUser, state],
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

const getAllTickets = async (req, res) => {
  try {
    req.log.info("Success");
    res.status(200).send("Hello");
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
};

const getTicketById = async (req, res) => {};

const editTicketById = async (req, res) => {};

const deleteTicketById = async (req, res) => {
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
  addTicket,
  getAllTickets,
  getTicketById,
  editTicketById,
  deleteTicketById,
};
