import express from "express";
import verifyAuth from "../services/helpers/verifyToken";

import services from "../services";

const router = express.Router();

router.post("/", verifyAuth, services.boards.addBoard);

router.get("/", verifyAuth, services.boards.getAllBoards);

router.get("/:id", verifyAuth, services.boards.getBoardById);

router.patch("/:id", verifyAuth, services.boards.editBoardById);

router.delete("/:id", verifyAuth, services.boards.deleteBoardById);

export default router;
