import { validationResult } from "express-validator";
import sequelize from "../config/database";
import validateRegister from "./helpers/registerValidation";
import validateLogin from "./helpers/loginValidation";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const addUser = async (req, res) => {
  try {
    const validationResults = validationResult(req);

    if (validationResults.isEmpty()) {
      const { error } = validateRegister(req);

      if (error) {
        res.status(400).send(error.details[0].message);
      }

      const { firstName, secondName, email, password } = { ...req.body };
      const userModel = req.context.models.user;

      const emailExist = await userModel.findOne({ where: { email: email } });

      if (emailExist) {
        res.status(400).send(`User with email ${email} is already exist`);
        return;
      }

      const hashSalt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, hashSalt);

      const newUser = await sequelize.models.user.create({
        first_name: firstName,
        second_name: secondName,
        email: email,
        password: hashedPassword,
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

const loginHandler = async (req, res) => {
  try {
    const { error } = validateLogin(req);

    if (error) {
      res.status(400).send(error.details[0].message);
    }

    const userModel = req.context.models.user;

    const user = await userModel.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      res.status(400).send(`User with email ${email} isn't exist`);
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      res.status(400).send("Incorrect credentials. Try again :)");
      return;
    }

    const token = jsonwebtoken.sign(
      { id: user.id },
      "planYourMeowSecretToken",
      {
        expiresIn: 300,
      }
    );

    req.session.user = user;

    res.header("authToken", token);
    res.status(200).send({
      auth: true,
      id: user.id,
      firstName: user.first_name,
      secondName: user.second_name,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error!");
  }
};

const getLoginStatus = async (req, res) => {
  if (req.session.user) {
    res.status(200).send({ loggedIn: true, user: req.session.user });

    return;
  }

  res.status(200).send({ loggedIn: false });
};

const getAuthInfo = async (req, res) => {};

const getAllUsers = async (req, res) => {
  try {
    const users = await req.context.models.user.findAll({
      include: [sequelize.models.workspace],
    });

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

export default {
  deleteUserById,
  getAllUsers,
  addUser,
  editUserDataById,
  loginHandler,
  getLoginStatus,
  getAuthInfo,
};
