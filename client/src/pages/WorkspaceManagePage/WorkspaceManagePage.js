import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FindAddForm from "../../Components/FindAddForm/FindAddForm";
import ParticipantsList from "../../Components/Workspace/ParticipantsList/ParticipantsList";
import SearchInput from "../../Components/SearchInput/SearchInput";

import api from "../../Api";
import "./WorkspaceManagePage.css";

const WorkspaceManagePage = () => {
  const { id } = useParams();
  const [workspaceInfo, setWorkspaceInfo] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  const fetchWorkspaceInfo = () => {
    setLoading(true);

    api
      .get(`/workspaces/${id}`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => {
        setWorkspaceInfo(res.data);
        setUsers(res.data.users);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  // const fetchUsersAndRoles = () => {
  //   setLoading(true);

  //   api
  //     .get(`/userTeamRoles/${id}`, {
  //       headers: { "auth-token": localStorage.getItem("id_token") },
  //     })
  //     .then((res) => setUsersAndRoles(res.data))
  //     .catch((error) => setError(error))
  //     .finally(() => setLoading(false));

  //   console.log("Wprkspace info have been fetched!");
  // };

  useEffect(fetchWorkspaceInfo, [id]);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  if (error) {
    return <p>Error occured :c</p>;
  }

  console.log(users);

  return (
    <section id="workspace-manage-section">
      <header id="workspace-manage-header">
        <h1>{workspaceInfo?.name}</h1>
      </header>
      <div id="workspace-manage-container">
        <div className="search-add-user-container">
          <div id="description-container">
            <h2>Description</h2>
            <p>{workspaceInfo?.description}</p>
          </div>
          <FindAddForm />
        </div>
        <div className="manage-users-container">
          <SearchInput />
          <ParticipantsList workspaceId={id} participants={users} />
        </div>
      </div>
    </section>
  );
};

export default WorkspaceManagePage;
