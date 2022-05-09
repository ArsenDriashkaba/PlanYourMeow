import express from "express";
import mysql from "mysql";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

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

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 12,
    },
  })
);

app.use((req, _, next) => {
  req.context = {
    models: sequelize.models,
  };
  next();
});

app.use("/users", routes.users);
app.use("/boards", routes.boards);
app.use("/workspaces", routes.workspaces);
app.use("/tickets", routes.tickets);
app.use("/userTeamRoles", routes.userTeamRoles);
app.use("/roles", routes.roles);

app.all("*", (_, res) => {
  res.status(404);
  res.send(`Non existing path dude ._.`);
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`App is working on port ${PORT}`);
  });
});
