import Ticket from "../Ticket";

import "./TicketList.css";

const TicketList = ({ tickets, fetchData }) => {
  return (
    <div className="tickets-list">
      {tickets?.map((ticket) => (
        <Ticket
          key={ticket.id}
          name={ticket?.name}
          ticket_id={ticket.id}
          fetchData={fetchData}
        />
      ))}
    </div>
  );
};

export default TicketList;
