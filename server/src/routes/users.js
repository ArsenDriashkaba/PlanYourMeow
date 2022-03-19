import express from "express";
import { param, body } from "express-validator";

import services from "../services";

const router = express.Router();

router.post(
  "/addUser",
  //   body("title")
  //     .isLength({ min: 3, max: 80 })
  //     .withMessage(
  //       "The length of the title must be min 3 and max 80 characters."
  //     ),
  services.users.addUser
);

router.get("/", services.users.getAllUsers);

router.delete(
  "/:id",
  param("id")
    .isLength({ min: 24, max: 24 })
    .withMessage(`Not a valid UserID value`),
  services.users.deleteUserById
);

export default router;
