import Sequelize from "sequelize";

import board from "../models/board";
import role from "../models/role";
import ticket from "../models/ticket";
import user from "../models/user";
import userTeamRole from "../models/userTeamRole";
import workspace from "../models/workspace";

const applyRelations = (sequelize) => {
  const { board, role, ticket, user, userTeamRole, workspace } =
    sequelize.models;

  user.hasMany(ticket);
  workspace.belongsTo(user);
  workspace.hasMany(board);
  board.hasMany(ticket);
  role.belongsTo(userTeamRole);
  user.belongsTo(userTeamRole);
  workspace.belongsTo(userTeamRole);
};

const sequelize = new Sequelize({
  dialect: "mysql",
  user: "root",
  password: "Strila654789",
  host: "localhost",
  database: "plan_your_meow_db",
});

const models = [board, role, ticket, user, userTeamRole, workspace];

models.forEach((model) => model(sequelize));

applyRelations(sequelize);

export default sequelize;
