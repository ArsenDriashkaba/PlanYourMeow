import { useState } from "react";

import "./TicketDescription.css";

const TicketDescription = ({
  description,
  editMode,
  ticketInfo,
  setTicketParams,
}) => {
  const [ticketDescription, setTicketDescription] = useState(description);

  const changeDescription = (event) => {
    const newTicketInfo = { ...ticketInfo };
    const value = event.target.value;

    setTicketDescription(value);

    newTicketInfo.description = value;

    setTicketParams(newTicketInfo);
  };

  return (
    <div id="ticket-description">
      <h2>Description of task:</h2>
      <p>
        {editMode ? (
          <textarea
            className="description-text-area"
            value={ticketDescription ? ticketDescription : ""}
            onChange={changeDescription}
          ></textarea>
        ) : (
          description
        )}
      </p>
    </div>
  );
};

export default TicketDescription;
