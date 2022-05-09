import { useEffect, useState } from "react";

import SearchInput from "../../SearchInput/SearchInput";
import UserPreview from "../../UserPreview/UserPreview";
import api from "../../../Api";

import "./AssignUser.css";

const AssignUser = ({ ticketInfo, fetchData }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [searchFilterValue, setSearchFilterValue] = useState();
  const [chosenUser, setChosenUser] = useState(ticketInfo.userId);

  const { id, boardId } = { ...ticketInfo };

  const fetchUsers = () => {
    api
      .get(`/tickets/${id}/${boardId}`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => setError(error));
  };

  useEffect(fetchUsers, []);

  const assignUserToTheTicket = (event) => {
    event.preventDefault();

    if (!chosenUser) {
      return;
    }

    const data = {
      userId: chosenUser?.userId,
    };

    api
      .patch(`/tickets/${ticketInfo.id}`, data, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        fetchData();
        console.log(res.data);
      })
      .catch((err) => {
        setError(err);
        console.log(error);
      });
  };

  const filteredUsers = searchFilterValue
    ? users.filter(
        (user) =>
          (user?.first_name
            .toLowerCase()
            .includes(searchFilterValue.toLowerCase()) ||
            user?.second_name
              .toLowerCase()
              .includes(searchFilterValue.toLowerCase())) &&
          user?.id !== ticketInfo?.userId
      )
    : [];

  return (
    <div className="find-add-user-container">
      <form action="submit" onSubmit={assignUserToTheTicket}>
        <SearchInput
          value={searchFilterValue}
          onChange={(event) => setSearchFilterValue(event.target.value)}
        />
        <div className="chosenUser">{chosenUser?.userName}</div>
        <button type="submit">Add</button>
      </form>
      <div id="find-users-list">
        {filteredUsers?.map((filteredUser) => (
          <UserPreview userInfo={filteredUser} setUser={setChosenUser} />
        ))}
      </div>
    </div>
  );
};

export default AssignUser;
