import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./src/routes";

const PORT = 3000;

export const database = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Strila654789",
  database: "plan_your_meow_db",
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/users", routes.users);

app.all("*", (_, res) => {
  res.status(404);
  res.send(`Non existing path dude ._.`);
});

app.listen(PORT, () => {
  console.log(`App is working on port ${PORT}`);
});
