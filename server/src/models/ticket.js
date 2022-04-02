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
    board_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    label: {
      type: DataTypes.STRING,
    },
    id_of_assigned_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING,
    },
  });

  return ticketModel;
};

export default ticket;
