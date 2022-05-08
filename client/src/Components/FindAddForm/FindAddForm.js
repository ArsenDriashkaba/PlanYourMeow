import { useEffect, useState } from "react";

import SearchInput from "../SearchInput/SearchInput";
import UserPreview from "../UserPreview/UserPreview";
import api from "../../Api";

import "./FindAddForm.css";

const FindAddForm = ({ workspaceId, updateWorkspaceInfo }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [searchFilterValue, setSearchFilterValue] = useState();
  const [chosenUser, setChosenUser] = useState();

  const fetchUsers = () => {
    api
      .get(`/users`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => setError(error));
  };

  useEffect(fetchUsers, []);

  const addUserTotheTeam = (event) => {
    event.preventDefault();

    if (!chosenUser) {
      return;
    }

    const data = {
      userId: chosenUser?.userId,
      workspaceId: workspaceId,
      roleId: 3,
      oldRoleId: 4,
    };

    api
      .post(`/userTeamRoles`, data, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        updateWorkspaceInfo();
        console.log(res.data);
      })
      .catch((error) => setError(error));
  };

  const filteredUsers = searchFilterValue
    ? users.filter(
        (user) =>
          user?.first_name
            .toLowerCase()
            .includes(searchFilterValue.toLowerCase()) ||
          user?.second_name
            .toLowerCase()
            .includes(searchFilterValue.toLowerCase())
      )
    : [];

  return (
    <div className="find-add-user-container">
      <form action="submit" onSubmit={addUserTotheTeam}>
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

export default FindAddForm;
