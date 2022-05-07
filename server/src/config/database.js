import Sequelize from "sequelize";

import board from "../models/board";
import role from "../models/role";
import ticket from "../models/ticket";
import user from "../models/user";
import userTeamRole from "../models/userTeamRole";
import workspace from "../models/workspace";

const applyRelations = (sequelize) => {
  const { board, role, ticket, user, workspace } = sequelize.models;
  const { DataTypes } = Sequelize;

  const userRole = sequelize.define("userRole", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
  });

  user.hasMany(ticket);
  ticket.belongsTo(user);
  workspace.hasMany(board);
  board.hasMany(ticket);
  board.belongsTo(workspace);

  // Users have a lot of roles
  role.belongsToMany(user, { through: "userRole" });
  user.belongsToMany(role, { through: "userRole" });

  // Wokspaces have a lot of users & users have a lot of workspaces
  workspace.belongsToMany(user, { through: "userWorkspace" });
  user.belongsToMany(workspace, { through: "userWorkspace" });

  // Workspace has a lot of user-role associations
  userRole.belongsToMany(workspace, { through: "workspaceUserRole" });
  workspace.belongsToMany(userRole, { through: "workspaceUserRole" });
};

const sequelize = new Sequelize("plan_your_meow_db", "root", "Strila654789", {
  dialect: "mysql",
  host: "localhost",
});

const models = [board, role, ticket, user, userTeamRole, workspace];

models.forEach((model) => model(sequelize));

applyRelations(sequelize);

export default sequelize;
