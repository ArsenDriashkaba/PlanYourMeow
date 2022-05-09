import React, { useEffect, useState } from "react";

import api from "../../Api";

import TicketList from "../Ticket/TicketList/TicketList";
import CreateInput from "../CreateInput/CreateInput";
import DeleteElementBtn from "../DeleteElementBtn/DeleteElementBtn";
import "./Board.css";

const Board = ({
  name,
  board_id,
  fetchData,
  errorHandler,
  boardTickets,
  isChange,
  userRole,
}) => {
  const [tickets, setTickets] = useState(boardTickets);
  const [error, setError] = useState();

  const setFetchedTickets = () => {
    api
      .get(`/tickets`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => setTickets(res.data))
      .catch((error) => setError(error));

    console.log("Tickets are fetched!");
  };

  useEffect(setFetchedTickets, [isChange]);

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
        {(userRole === 2 || userRole === 1) && (
          <DeleteElementBtn
            reqUrl={"boards"}
            elementId={board_id}
            fetchData={fetchData}
            errorHandler={errorHandler}
          />
        )}
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
          boardId={board_id}
          userRole={userRole}
        />
      )}
    </div>
  );
};

export default Board;
