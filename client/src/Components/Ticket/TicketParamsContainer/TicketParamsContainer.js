import "./TicketParamsContainer.css";

import CustomDropDown from "../../CustomDropDown/CustomDropDown";

const TicketParamsContainer = ({ ticketInfo, fetchData }) => {
  const labelOptions = [
    { value: 1, label: "green" },
    { value: 2, label: "red" },
    { value: 3, label: "blue" },
    { value: 4, label: "yellow" },
    { value: 5, label: "purple" },
  ];

  return (
    <div id="ticket-params-container">
      <span>{"Assign user"}</span>
      <div className="change-label-container">
        <h3>Choose label</h3>
        <CustomDropDown
          currElem={ticketInfo?.label}
          arrOfOptions={labelOptions}
          url={"tickets"}
          elemId={ticketInfo?.id}
          paramId={"label"}
          fetchData={fetchData}
        />
      </div>
      <div className="change-deadline-container">
        <h3>Choose deadline</h3>
      </div>
      <div className="change-state-container">
        <h3>Done:</h3>
        <input type="checkbox" name="" id="" />
      </div>
    </div>
  );
};

export default TicketParamsContainer;
