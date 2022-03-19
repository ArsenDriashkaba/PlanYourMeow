import { validationResult } from "express-validator";
import { database } from "../..";

const addBoard = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const firstName = req.body.firstName;
      const secondName = req.body.secondName;
      const email = req.body.email;
      const password = req.body.password;

      database.query(
        `INSERT INTO users (first_name, second_name, email, password) VALUES (?, ?, ?, ?)`,
        [firstName, secondName, email, password],
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

const getAllBoards = async (req, res) => {
  try {
    req.log.info("Success");
    res.status(200).send("Hello");
  } catch (error) {
    req.log.error(error);
    res.sendStatus(500);
  }
};

const getBoardById = async (req, res) => {};

const editBoardById = async (req, res) => {};

const deleteBoardById = async (req, res) => {
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
  addBoard,
  getAllBoards,
  getBoardById,
  editBoardById,
  deleteBoardById,
};