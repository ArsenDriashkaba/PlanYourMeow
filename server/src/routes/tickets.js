import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post("/addTicket", services.tickets.addTicket);

router.get("/", services.tickets.getAllTickets);

router.get("/:id", services.tickets.getTicketById);

router.patch("/:id", services.tickets.editTicketById);

router.delete("/:id", services.tickets.deleteTicketById);

export default router;
