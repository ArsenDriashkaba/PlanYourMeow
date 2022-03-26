import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const userTeamRole = (sequelize) => {
  const userTeamRoleModel = sequelize.define("user_team_role", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    workspace_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return userTeamRoleModel;
};

export default userTeamRole;
