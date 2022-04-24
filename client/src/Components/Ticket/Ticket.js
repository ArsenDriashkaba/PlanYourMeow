import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import DeleteElementBtn from "../DeleteElementBtn/DeleteElementBtn";
import { Link } from "react-router-dom";

import "./Ticket.css";

const Ticket = ({ name, ticket_id, fetchData, index }) => {
  const [error, setError] = useState();

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <Draggable draggableId={`${ticket_id}`} index={index}>
      {(provided) => (
        <div
          className="ticket"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="ticket-info-container">
            <header className="ticket-header">
              <Link to={`/tickets/${ticket_id}`}>
                <h2 className="ticket-name">{name}</h2>
              </Link>
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
      )}
    </Draggable>
  );
};

export default Ticket;
