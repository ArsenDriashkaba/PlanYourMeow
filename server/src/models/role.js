import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const role = (sequelize) => {
  const roleModel = sequelize.define("role", {
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
  });

  return roleModel;
};

export default role;
