import React from "react";
import TicketList from "../Ticket/TicketList/TicketList";
import "./style.css";

const Board = ({ name, board_id }) => {
  return (
    <div className="board">
      <header className="board-header">
        <div className="board-info">
          <h2 className="board-name">{name}</h2>
          <span className="count-of-tickets">10</span>
        </div>
      </header>
      <div className="create-ticket">
        <input type="text" />
        <button className="add-ticket">+</button>
      </div>
      <TicketList tickets={[]} />
    </div>
  );
};

export default Board;
