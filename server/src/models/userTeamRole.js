import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const userTeamRole = (sequelize) => {
  const userTeamRoleModel = sequelize.define("userTeamRole", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    workspaceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    roleId: {
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
