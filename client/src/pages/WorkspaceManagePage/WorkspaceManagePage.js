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
  const [searchFilterValue, setSearchFilterValue] = useState("");
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

  useEffect(fetchWorkspaceInfo, [id]);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  if (error) {
    return <p>Error occured :c</p>;
  }

  const filteredUsers = users.filter(
    (user) =>
      user?.first_name
        .toLowerCase()
        .includes(searchFilterValue.toLowerCase()) ||
      user?.second_name.toLowerCase().includes(searchFilterValue.toLowerCase())
  );

  console.log(filteredUsers);

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
          <SearchInput
            value={searchFilterValue}
            onChange={(event) => setSearchFilterValue(event.target.value)}
          />
          <ParticipantsList workspaceId={id} participants={filteredUsers} />
        </div>
      </div>
    </section>
  );
};

export default WorkspaceManagePage;
