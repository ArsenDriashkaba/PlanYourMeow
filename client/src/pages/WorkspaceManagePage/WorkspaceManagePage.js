import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FindAddForm from "../../Components/FindAddForm/FindAddForm";
import ParticipantsList from "../../Components/Workspace/ParticipantsList/ParticipantsList";

import api from "../../Api";
import "./WorkspaceManagePage.css";

const WorkspaceManagePage = () => {
  const { id } = useParams();
  const [workspaceInfo, setWorkspaceInfo] = useState([]);
  const [usersAndRoles, setUsersAndRoles] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchWorkspaceInfo = () => {
    setLoading(true);

    api
      .get(`/workspaces/${id}`)
      .then((res) => setWorkspaceInfo(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    console.log("Wprkspace info have been fetched!");
  };

  const fetchUsersAndRoles = () => {
    setLoading(true);

    api
      .get(`/userTeamRoles/${id}`)
      .then((res) => setUsersAndRoles(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    console.log("Wprkspace info have been fetched!");
  };

  useEffect(fetchWorkspaceInfo, [id]);
  //   useEffect(fetchUsersAndRoles, [id, usersAndRoles]);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <section>
      <header>
        <h1>{workspaceInfo?.name}</h1>
        <FindAddForm />
      </header>
      <div id="workspace-info-container">
        <ParticipantsList participants={[]} />
        <div id="description-container">
          <p>{workspaceInfo?.description}</p>
        </div>
      </div>
    </section>
  );
};

export default WorkspaceManagePage;
