import { useState, useEffect, useContext } from "react";
import Dropdown from "react-dropdown";

import api from "../../../Api";
import userContext from "../../../context/userContext";

import "./ParticipantPreview.css";

const ParticipantPreview = ({ userInfo, workspaceId }) => {
  const [error, setError] = useState();
  const [role, setRole] = useState();
  const [editingState, setEditingState] = useState(false);
  const [chosenRole, setChosenRole] = useState();

  const userCtx = useContext(userContext);

  useEffect(() => {
    if (userCtx.userId) {
      api
        .get(`/userTeamRoles/${userInfo.id}/${workspaceId}`)
        .then((res) => {
          setRole(res.data[0].userRoles[0].roleId);
        })
        .catch((error) => setError(error));
    }
  }, [workspaceId, userCtx.userId, userInfo.id]);

  if (error) {
    return <p>Error occured :c</p>;
  }

  const handleRoleChange = (event) => {
    event.preventDefault();

    if (!chosenRole) {
      return;
    }

    const data = {
      userId: userInfo.id,
      workspaceId: workspaceId,
      roleId: chosenRole,
      oldRoleId: role,
    };

    console.log(data);

    api
      .post(`/userTeamRoles`, data, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        setRole(chosenRole);
        console.log(res.data);
      })
      .catch((error) => setError(error));

    setEditingState(false);
  };

  const userName = `${userInfo?.first_name} ${userInfo?.second_name}`;
  const roleOptions = [
    { value: 2, label: "admin" },
    { value: 3, label: "default" },
    { value: 4, label: "reader" },
  ];
  const defaultRoleLabel = roleOptions.filter(
    (option) => option?.value === role
  )[0]?.label;

  return (
    <div className="participant-preview">
      <h2>{userName}</h2>

      {editingState ? (
        <form action="submit" onSubmit={handleRoleChange}>
          <select onChange={(event) => setChosenRole(event.target.value)}>
            <option value={role}>
              {defaultRoleLabel ? defaultRoleLabel : "Owner"}
            </option>
            {role !== 1 &&
              roleOptions?.map((option) => {
                if (option.value !== role) {
                  return <option value={option?.value}>{option?.label}</option>;
                }
                return <></>;
              })}
          </select>

          <button type="submit">Ok</button>
        </form>
      ) : (
        <button onClick={() => setEditingState(true)}>Change</button>
      )}
    </div>
  );
};

export default ParticipantPreview;
