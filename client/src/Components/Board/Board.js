import React from "react";
import Ticket from "../Ticket/Ticket";
import "./style.css";

const Board = () => {
  return (
    <div className="board">
      <header className="board-header">
        <div className="board-info">
          <h2 className="board-name">Test Board Name</h2>
          <span className="count-of-tickets">10</span>
        </div>
      </header>
      <div className="create-ticket">
        <input type="text" />
        <button className="add-ticket">+</button>
      </div>
      <div className="tickets">
        <Ticket />
      </div>
    </div>
  );
};

export default Board;
