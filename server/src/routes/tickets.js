import express from "express";
import verifyAuth from "../services/helpers/verifyToken";

import services from "../services";

const router = express.Router();

router.post("/", verifyAuth, services.tickets.addTicket);

router.get("/", verifyAuth, services.tickets.getAllTickets);

router.get("/:id", verifyAuth, services.tickets.getTicketById);

router.get("/:id/:boardId", verifyAuth, services.tickets.getAvailableUsers);

router.patch("/:id", verifyAuth, services.tickets.editTicketById);

router.delete("/:id", verifyAuth, services.tickets.deleteTicketById);

export default router;
