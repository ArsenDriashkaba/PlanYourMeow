import { useState } from "react";

import DeleteElementBtn from "../DeleteElementBtn/DeleteElementBtn";

import "./Ticket.css";

const Ticket = ({ name, ticket_id, fetchData }) => {
  const [error, setError] = useState();

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <div className="ticket">
      <div className="ticket-info-container">
        <header className="ticket-header">
          <h2 className="ticket-name">{name}</h2>
        </header>
        <div className="ticket-person"></div>
      </div>
      <DeleteElementBtn
        elementId={ticket_id}
        reqUrl={"tickets"}
        fetchData={fetchData}
        errorHandler={setError}
      />
    </div>
  );
};

export default Ticket;
