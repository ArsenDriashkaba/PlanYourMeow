import { useState, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

import api from "../../Api";

import TicketLabel from "./TicketLabel/TicketLabel";
import DeleteElementBtn from "../DeleteElementBtn/DeleteElementBtn";
import { Link } from "react-router-dom";

import "./Ticket.css";

const Ticket = ({ ticketInfo, fetchData, index, userRole }) => {
  const [error, setError] = useState();
  const [user, setUser] = useState();

  const { name, id, label, state, deadline } = { ...ticketInfo };
  const ticketStateDone = state === "Done";

  const parseDeadline = (deadlineDate) => {
    if (!deadlineDate) {
      return;
    }

    const date = new Date(deadlineDate);
    const month = date.getMonth() + 1;
    const day = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const fetchUserInfo = () => {
    api
      .get(`/users/${ticketInfo.userId}`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(fetchUserInfo, []);

  const userName = user ? `${user?.first_name} ${user?.second_name}` : "";

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          className="ticket"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <TicketLabel label={label} done={ticketStateDone} />
          <div className="ticket-info-container">
            <header className="ticket-header">
              <Link to={`/tickets/${id}`}>
                <h2
                  className={`ticket-name ${ticketStateDone && "ticket-done"}`}
                >
                  {name}
                </h2>
              </Link>
            </header>
            <span className="ticket-deadline">{parseDeadline(deadline)}</span>
            <div className="ticket-person">{userName}</div>
          </div>
          {userRole !== 4 && (
            <DeleteElementBtn
              elementId={id}
              reqUrl={"tickets"}
              fetchData={fetchData}
              errorHandler={setError}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Ticket;
