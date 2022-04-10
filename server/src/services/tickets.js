import { sanitize, validationResult } from "express-validator";
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

const getTicketById = async (req, res) => {};

const editTicketById = async (req, res) => {};

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
  editTicketById,
  deleteTicketById,
};
