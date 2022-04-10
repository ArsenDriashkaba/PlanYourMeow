import { useState } from "react";

import api from "../../Api";

const CreateInput = ({ board_id, fetchTickets }) => {
  const [ticketInfo, setTicketInfo] = useState({});
  const [error, setError] = useState();

  const inputTextHandler = (event) => {
    const ticketName = event.target.value;
    const newTicket = { name: ticketName, boardId: board_id };

    setTicketInfo(newTicket);
  };

  const submitToHandler = (event) => {
    event.preventDefault();

    if (ticketInfo === {} || ticketInfo.name == null) {
      return;
    }

    api
      .post(`/tickets`, ticketInfo)
      .then(() => {
        console.log("Ticket added");
        fetchTickets();
      })
      .catch((error) => setError(error))
      .finally(setTicketInfo({}));
  };

  return (
    <form className="create-ticket">
      <input
        type="text"
        value={ticketInfo.name ? ticketInfo.name : ""}
        onChange={inputTextHandler}
      />
      <button className="add-ticket" type="submit" onClick={submitToHandler}>
        +
      </button>
      {error && <p>Error occured :c</p>}
    </form>
  );
};

export default CreateInput;
