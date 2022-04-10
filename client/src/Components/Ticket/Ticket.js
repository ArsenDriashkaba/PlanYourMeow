import { useState } from "react";

import DeleteElementBtn from "../DeleteElementBtn/DeleteElementBtn";

import "./style.css";

const Ticket = ({ name, ticket_id, fetchData }) => {
  const [error, setError] = useState();

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
