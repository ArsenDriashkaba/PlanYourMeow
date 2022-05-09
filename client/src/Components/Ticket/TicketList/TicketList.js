import Ticket from "../Ticket";
import { Droppable } from "react-beautiful-dnd";

import "./TicketList.css";

const TicketList = ({ tickets, fetchData, boardId, userRole }) => {
  return (
    <Droppable droppableId={`${boardId}`}>
      {(provided) => (
        <div
          className="tickets-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tickets?.map((ticket, index) => (
            <Ticket
              key={ticket.id}
              ticketInfo={ticket}
              fetchData={fetchData}
              boardId={ticket?.boardId}
              index={index}
              userRole={userRole}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TicketList;
