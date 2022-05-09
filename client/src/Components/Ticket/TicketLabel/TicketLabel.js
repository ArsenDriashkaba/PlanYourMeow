import "./TicketLabel.css";

const TicketLabel = ({ label, done }) => {
  return <div className={`label-container label-${!done && label}`}></div>;
};

export default TicketLabel;
