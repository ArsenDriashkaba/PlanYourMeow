import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addBoard = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { name, workspaceId } = { ...req.body };

      const newBoard = await sequelize.models.board.create({
        name: name,
        workspaceId: workspaceId,
      });

      res.status(200).send(newBoard);
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getAllBoards = async (req, res) => {
  try {
    const boards = await req.context.models.board.findAll({
      include: [{ model: req.context.models.ticket }],
    });

    res.status(200).send(boards);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getBoardById = async (req, res) => {};

const editBoardById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const boardId = req.params.id;
    const board = await req.context.models.board.findOne({
      where: { id: boardId },
    });

    if (board == null) {
      const boardNotFoundMsg = `User with id "${boardId}" is not found...`;

      console.log(boardNotFoundMsg);
      res.status(404).send(boardNotFoundMsg);

      return;
    }

    const boardModel = await sequelize.models.board;

    await boardModel.update(
      {
        name: req.body.name,
      },
      { where: { id: boardId } }
    );

    const successMsg = `You've succsesfully updated board with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteBoardById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const boardId = req.params.id;
    const board = await req.context.models.board.findOne({
      where: { id: boardId },
    });

    if (board == null) {
      const boardNotFoundMsg = `User with id "${boardId}" is not found...`;

      console.log(boardNotFoundMsg);
      res.status(404).send(boardNotFoundMsg);

      return;
    }

    await sequelize.models.board.destroy({ where: { id: boardId } });

    const successMsg = `You've succsesfully deleted board with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
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
