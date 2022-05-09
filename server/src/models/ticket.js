import Sequelize from "sequelize";

const { DataTypes } = Sequelize;

const ticket = (sequelize) => {
  const ticketModel = sequelize.define("ticket", {
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
    description: {
      type: DataTypes.STRING,
    },
    deadline: {
      type: DataTypes.DATE,
    },
    label: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
  });

  return ticketModel;
};

export default ticket;
