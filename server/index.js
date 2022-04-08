import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

import sequelize from "./src/config/database";
import routes from "./src/routes";

const PORT = 3001;

export const database = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Strila654789",
  database: "plan_your_meow_db",
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, _, next) => {
  req.context = {
    models: sequelize.models,
  };
  next();
});

app.use("/users", routes.users);
app.use("/boards", routes.boards);
app.use("/workspaces", routes.workspaces);

app.all("*", (_, res) => {
  res.status(404);
  res.send(`Non existing path dude ._.`);
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App is working on port ${PORT}`);
  });
});
