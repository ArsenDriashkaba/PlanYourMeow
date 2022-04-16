import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../Api";

import "./TicketDetailPage.css";

const TicketDetailPage = () => {
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const setFetchedTicketInfo = () => {
    api
      .get(`/tickets/${id}`)
      .then((res) => setTicketInfo(res.data))
      .catch((error) => setError(error));

    console.log("Ticket info is fetched!");
  };

  const toggleEditMode = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  useEffect(setFetchedTicketInfo, [id]);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  if (error) {
    return <p>Error occured :c</p>;
  }

  const { name, description, deadline, label, state, userId } = {
    ...ticketInfo,
  };

  console.log(name, description);

  return (
    <section id="ticket-detail-page">
      <header id="ticket-page-header">
        <h1>{name}</h1>
        {editMode ? (
          <button onClick={toggleEditMode}>Save</button>
        ) : (
          <button onClick={toggleEditMode}>Edit</button>
        )}
      </header>
      <div id="ticket-details">
        <p>{description}</p>
      </div>
      <div id="ticket-params-container">
        <span>{userId ? userId : "Assign user"}</span>
        <span>{label ? label : "Choose label"}</span>
        <span>{deadline ? deadline : "Choose deadline"}</span>
        <span>{state ? state : "State of the ticket"}</span>
      </div>
    </section>
  );
};

export default TicketDetailPage;
