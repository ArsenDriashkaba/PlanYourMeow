import React from "react";
import "./style.css";

const Ticket = ({ name }) => {
  return (
    <div className="ticket">
      <header className="ticket-header">
        <h2 className="name">{name}</h2>
      </header>
      <div>
        <div className="ticket-person"></div>
      </div>
    </div>
  );
};

export default Ticket;
