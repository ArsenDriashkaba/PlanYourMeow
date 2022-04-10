import { useState } from "react";

import api from "../../Api";

import "./style.css";

const Ticket = ({ name, ticket_id, fetchData }) => {
  const [error, setError] = useState();

  const deleteTicket = () => {
    api
      .delete(`/tickets/${ticket_id}`)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => setError(error));
  };

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <div className="ticket">
      <header className="ticket-header">
        <h2 className="name">{name}</h2>
      </header>
      <div>
        <div className="ticket-person"></div>
      </div>
      <button onClick={deleteTicket}>X</button>
    </div>
  );
};

export default Ticket;
