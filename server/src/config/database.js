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
  ticket.belongsTo(user);
  workspace.belongsTo(user);
  workspace.hasMany(board);
  board.hasMany(ticket);
  board.belongsTo(workspace);
  // role.belongsTo(userTeamRole);
  // user.belongsTo(userTeamRole);
};

const sequelize = new Sequelize("plan_your_meow_db", "root", "Strila654789", {
  dialect: "mysql",
  host: "localhost",
});

const models = [board, role, ticket, user, userTeamRole, workspace];

models.forEach((model) => model(sequelize));

applyRelations(sequelize);

export default sequelize;
