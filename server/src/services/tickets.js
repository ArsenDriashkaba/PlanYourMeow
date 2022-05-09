import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addTicket = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const ticketInfo = req.body;

      const newTicket = await sequelize.models.ticket.create(ticketInfo);

      res.status(200).send(newTicket);
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getAllTickets = async (req, res) => {
  try {
    const tickets = await req.context.models.ticket.findAll();

    res.status(200).send(tickets);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getTicketById = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    const models = req.context.models;
    const ticketModel = models.ticket;

    if (validationResults.isEmpty()) {
      const ticket = await ticketModel.findOne({
        where: { id: req.params.id },
      });

      if (ticket == null) {
        const ticketNotFoundMsg = `Ticket with id "${req.params.id}" is not found...`;

        res.status(404).send(ticketNotFoundMsg);

        return;
      }

      res.status(200).send(ticket);
    } else {
      res.send(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const getAvailableUsers = async (req, res) => {
  try {
    const validationResults = validationResult(req);
    const models = req.context.models;
    const ticketModel = models.ticket;
    const boardModel = models.board;
    const workspaceModel = models.workspace;

    if (validationResults.isEmpty()) {
      const board = await boardModel.findOne({
        where: { id: req.params.boardId },
      });

      const workspace = await workspaceModel.findOne({
        where: { id: board?.workspaceId },
        include: [{ model: sequelize.models.user }],
      });

      if (!board || !workspace) {
        res.status(404).send("bad request");

        return;
      }

      res.status(200).send(workspace.users);
    } else {
      res.send(400);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const editTicketById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const ticketId = req.params.id;
    const ticket = await req.context.models.ticket.findOne({
      where: { id: ticketId },
    });

    if (ticket == null) {
      const ticketNotFoundMessage = `Ticket with id "${ticketId}" is not found...`;

      console.log(ticketNotFoundMessage);
      res.status(404).send(ticketNotFoundMessage);

      return;
    }

    const ticketModel = await sequelize.models.ticket;

    await ticketModel.update(req.body, { where: { id: ticketId } });

    const successMsg = `You've succsesfully updated ticket with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteTicketById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const ticketId = req.params.id;
    const ticket = await req.context.models.ticket.findOne({
      where: { id: ticketId },
    });

    if (ticket == null) {
      const ticketNotFoundMsg = `Ticket with id "${ticketId}" is not found...`;

      res.status(404).send(ticketNotFoundMsg);

      return;
    }

    await sequelize.models.ticket.destroy({ where: { id: ticketId } });

    const successMsg = `You've succsesfully deleted ticket with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default {
  addTicket,
  getAllTickets,
  getTicketById,
  getAvailableUsers,
  editTicketById,
  deleteTicketById,
};
