import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post("/", services.boards.addBoard);

router.get("/", services.boards.getAllBoards);

router.get("/:id", services.boards.getBoardById);

router.patch("/:id", services.boards.editBoardById);

router.delete("/:id", services.boards.deleteBoardById);

export default router;
