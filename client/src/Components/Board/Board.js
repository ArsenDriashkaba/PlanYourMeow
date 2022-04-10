import React, { useEffect, useState } from "react";

import api from "../../Api";

import TicketList from "../Ticket/TicketList/TicketList";
import CreateInput from "../CreateInput/CreateInput";
import "./style.css";

const Board = ({ name, board_id }) => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState();

  const setFetchedTickets = () => {
    api
      .get(`/tickets`)
      .then((res) => setTickets(res.data))
      .catch((error) => setError(error));

    console.log("Tickets are fetched!");
  };

  useEffect(setFetchedTickets, []);

  const filteredTicketsByBoard = tickets.filter(
    (ticket) => ticket?.boardId === board_id
  );

  return (
    <div className="board">
      <header className="board-header">
        <div className="board-info">
          <h2 className="board-name">{name}</h2>
          <span className="count-of-tickets">10</span>
        </div>
      </header>
      <CreateInput
        elementId={board_id}
        fetchData={setFetchedTickets}
        targetId={"boardId"}
        postUrl={"tickets"}
      />
      {error ? (
        <p>Error occured :c</p>
      ) : (
        <TicketList
          tickets={filteredTicketsByBoard}
          fetchData={setFetchedTickets}
        />
      )}
    </div>
  );
};

export default Board;
