import { validationResult } from "express-validator";
import sequelize from "../config/database";

const addUser = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { firstName, secondName, email, password } = { ...req.body };

      const newUser = await sequelize.models.user.create({
        first_name: firstName,
        second_name: secondName,
        email: email,
        password: password,
      });

      res.status(200).send(newUser);
    } else {
      req.log.info(`Validation error value: ${validationResults}`);
      res.status(400).send(validationResults);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await req.context.models.user.findAll();

    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUserById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const userId = req.params.id;
    const user = await req.context.models.user.findOne({
      where: { id: userId },
    });

    if (user == null) {
      const userNotFoundMsg = `User with id "${userId}" is not found...`;

      console.log(userNotFoundMsg);
      res.status(404).send(userNotFoundMsg);

      return;
    }

    await sequelize.models.user.destroy({ where: { id: userId } });

    const successMsg = `You've succsesfully deleted user with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const editUserDataById = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (!validationResults.isEmpty()) {
      console.log(validationResults);
      res.status(400).send(validationResults);

      return;
    }

    const userId = req.params.id;
    const user = await req.context.models.user.findOne({
      where: { id: userId },
    });

    if (user == null) {
      const userNotFoundMsg = `User with id "${userId}" is not found...`;

      console.log(userNotFoundMsg);
      res.status(404).send(userNotFoundMsg);

      return;
    }

    const reqBodyKeys = Object.keys(req.body);
    const userModel = await sequelize.models.user;

    reqBodyKeys.forEach(async (attribute) => {
      switch (attribute) {
        case "firstName":
          await userModel.update(
            {
              first_name: req.body.firstName,
            },
            { where: { id: userId } }
          );
          break;
        case "secondName":
          await sequelize.models.user.update(
            {
              second_name: req.body.secondName,
            },
            { where: { id: userId } }
          );
          break;
        case "email":
          await sequelize.models.user.update(
            { email: req.body.email },
            { where: { id: userId } }
          );
          break;
        case "password":
          await sequelize.models.user.update(
            { password: req.body.password },
            { where: { id: userId } }
          );
          break;
      }
    });

    const successMsg = `You've succsesfully updated user with id: ${req.params.id}`;

    console.log(successMsg);
    res.status(200).send(successMsg);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default { deleteUserById, getAllUsers, addUser, editUserDataById };
