import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const userTeamRole = (sequelize) => {
  const userTeamRoleModel = sequelize.define("userTeamRole");

  return userTeamRoleModel;
};

export default userTeamRole;
