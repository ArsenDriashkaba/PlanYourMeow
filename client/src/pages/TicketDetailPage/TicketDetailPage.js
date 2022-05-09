import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import ElementPageHeader from "../../Components/Ticket/TicketPageHeader/ElementPageHeader";
import TicketParamsContainer from "../../Components/Ticket/TicketParamsContainer/TicketParamsContainer";
import Description from "../../Components/Ticket/Description/Description";
import api from "../../Api";

import "./TicketDetailPage.css";

const TicketDetailPage = () => {
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [newTicketParams, setNewTicketParams] = useState();
  const [error, setError] = useState();

  const setFetchedTicketInfo = () => {
    setLoading(true);

    api
      .get(`/tickets/${id}`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => setTicketInfo(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    console.log("Ticket info is fetched!");
  };

  const updateTicketInfo = () => {
    api
      .patch(`/tickets/${id}`, newTicketParams, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then(() => {
        setFetchedTicketInfo();
        console.log("Ticket is updated :)");
      })
      .catch((error) => setError(error));
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

  const { name, description } = {
    ...ticketInfo,
  };

  return (
    <section id="ticket-detail-page">
      <ElementPageHeader
        name={name}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        fetchData={setFetchedTicketInfo}
        setElementParams={setNewTicketParams}
        elementInfo={ticketInfo}
        updateElementInfo={updateTicketInfo}
      />
      <div className="ticket-detail-body">
        <Description
          description={description}
          editMode={editMode}
          fetchData={setFetchedTicketInfo}
          setElementParams={setNewTicketParams}
          elementInfo={ticketInfo}
        />
        <TicketParamsContainer
          ticketInfo={ticketInfo}
          fetchData={setFetchedTicketInfo}
        />
      </div>
    </section>
  );
};

export default TicketDetailPage;
