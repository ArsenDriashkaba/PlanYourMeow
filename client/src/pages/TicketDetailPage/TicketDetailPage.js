import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import TicketPageHeader from "../../Components/Ticket/TicketPageHeader/TicketPageHeader";
import TicketParamsContainer from "../../Components/Ticket/TicketParamsContainer/TicketParamsContainer";
import TicketDescription from "../../Components/Ticket/TicketDescription/TicketDescription";
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
      <TicketPageHeader
        name={name}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
        fetchData={setFetchedTicketInfo}
        setTicketParams={setNewTicketParams}
        ticketInfo={ticketInfo}
        updateTicketInfo={updateTicketInfo}
      />
      <div className="ticket-detail-body">
        <TicketDescription
          description={description}
          editMode={editMode}
          fetchData={setFetchedTicketInfo}
          setTicketParams={setNewTicketParams}
          ticketInfo={ticketInfo}
        />
        <TicketParamsContainer />
      </div>
    </section>
  );
};

export default TicketDetailPage;
