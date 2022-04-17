import { useState } from "react";

import "./TicketPageHeader.css";

const TicketPageHeader = ({
  name,
  editMode,
  toggleEditMode,
  ticketInfo,
  setTicketParams,
  updateTicketInfo,
}) => {
  const [ticketName, setTicketName] = useState(name);

  const changeName = (event) => {
    const newTicketInfo = { ...ticketInfo };
    const value = event.target.value;

    newTicketInfo.name = value;
    setTicketName(value);

    setTicketParams(newTicketInfo);
  };

  const saveEventHandler = () => {
    updateTicketInfo();
    toggleEditMode();
  };

  return (
    <header id="ticket-page-header">
      <h1>
        {editMode ? (
          <input value={ticketName} onChange={changeName}></input>
        ) : (
          name
        )}
      </h1>

      {editMode ? (
        <button onClick={saveEventHandler}>Save</button>
      ) : (
        <button onClick={toggleEditMode}>Edit</button>
      )}
    </header>
  );
};

export default TicketPageHeader;
