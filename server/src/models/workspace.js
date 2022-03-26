import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const workspace = (sequelize) => {
  const workspaceModel = sequelize.define("workspace", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return workspaceModel;
};

export default workspace;
