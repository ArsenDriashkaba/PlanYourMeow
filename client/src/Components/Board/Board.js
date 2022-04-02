import React from "react";
import "./style.css";

const Board = () => {
  return (
    <div className="board">
      <header>
        <div className="info">
          <h2 className="name">Test Board Name</h2>
          <span className="count-of-tickets">10</span>
        </div>
      </header>
      <div className="create-ticket">
        <input type="text" />
        <button className="add-ticket">+</button>
      </div>
      <div className="tickets"></div>
    </div>
  );
};

export default Board;
