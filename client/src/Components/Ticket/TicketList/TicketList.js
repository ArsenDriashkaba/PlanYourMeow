import Ticket from "../Ticket";

const TicketList = ({ tickets }) => {
  return (
    <div className="tickets-list">
      {tickets?.map((ticket) => (
        <Ticket key={ticket.id} name={ticket?.name} ticket_id={ticket.id} />
      ))}
    </div>
  );
};

export default TicketList;
