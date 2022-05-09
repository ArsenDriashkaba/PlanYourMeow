import { useEffect, useState } from "react";

import api from "../../../Api";

import "./TicketParamsContainer.css";
import "react-calendar/dist/Calendar.css";

import Calendar from "react-calendar";
import CustomDropDown from "../../CustomDropDown/CustomDropDown";
import AssignUser from "../AssignUser/AssignUser";

const TicketParamsContainer = ({ ticketInfo, fetchData }) => {
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState();

  const labelOptions = [
    { value: 1, label: "green" },
    { value: 2, label: "red" },
    { value: 3, label: "blue" },
    { value: 4, label: "yellow" },
    { value: 5, label: "purple" },
  ];

  const stateOptions = [
    { value: 1, label: "Done" },
    { value: 2, label: "InProgress" },
  ];

  const fetchUserInfo = () => {
    api
      .get(`/users/${ticketInfo.userId}`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const data = { deadline: date };

    console.log(data);

    api
      .patch(`/tickets/${ticketInfo.id}`, data, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then(() => {
        console.log("Deadline changed!");
      })
      .catch((error) => console.log(error));
  }, [date, ticketInfo.id]);

  useEffect(fetchUserInfo, []);

  const userName = user ? `${user?.first_name} ${user?.second_name}` : "";

  return (
    <div id="ticket-params-container">
      <div className="assign-user-container">
        <h3>Assign user</h3>
        <h2>{userName}</h2>
        <AssignUser ticketInfo={ticketInfo} fetchData={fetchData} />
      </div>
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
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className="change-state-container">
        <h3>Done:</h3>
        <CustomDropDown
          currElem={ticketInfo?.state}
          arrOfOptions={stateOptions}
          url={"tickets"}
          elemId={ticketInfo?.id}
          paramId={"state"}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default TicketParamsContainer;
