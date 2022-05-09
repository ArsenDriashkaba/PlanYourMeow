import { useEffect, useState } from "react";

import api from "../../../../Api";

import "./UserAssign.css";
import UserPreview from "../UserPreview/UserPreview";

const UserAssign = ({ workspaceId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get(`/userTeamRoles/${workspaceId}`).then((res) => setUsers(res.data));
  }, [users, workspaceId]);

  const filteredUsers = users;

  return (
    <div id="assign-user-container">
      <h3>Assign User:</h3>
      <input type="text" />
      <ul id="assign-users-list">
        {filteredUsers?.map((user) => (
          <UserPreview name={user?.name} />
        ))}
      </ul>
    </div>
  );
};

export default UserAssign;
