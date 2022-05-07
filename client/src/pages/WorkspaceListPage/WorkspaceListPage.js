import { useEffect, useState, useContext } from "react";

import userContext from "../../context/userContext";

import api from "../../Api";
import "./WorkspaceListPage.css";

import SearchInput from "../../Components/SearchInput/SearchInput";
import WorkspaceList from "../../Components/Workspace/WorkspaceList/WorkspaceList";
import CreateInput from "../../Components/CreateInput/CreateInput";

const WorkspaceListPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [userId, setUserId] = useState();
  const userCtx = useContext(userContext);

  const setFetchedWorkspaces = () => {
    setLoading(true);

    if (userCtx.userId) {
      setUserId(userCtx.userId);

      api
        .get(`/workspaces/user/${userCtx.userId}`, {
          headers: { "auth-token": localStorage.getItem("id_token") },
        })
        .then((res) => {
          setWorkspaces(res.data);
          console.log(res.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    }
  };

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace?.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(setFetchedWorkspaces, [userCtx.userId]);

  return (
    <section id="all-workspaces-section">
      <header id="workspaces-main-header">
        <div className="workspaces-search-container">
          <h2>Find workspaces</h2>
          <SearchInput
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <div className="workspaces-create-container">
          <CreateInput
            fetchData={setFetchedWorkspaces}
            postUrl={`workspaces/${userId}/1`}
          />
        </div>
      </header>
      <hr />
      {isLoading && <p>Page is loading</p>}
      {error && <p>Page error :c</p>}
      <WorkspaceList
        workspaces={filteredWorkspaces}
        fetchData={setFetchedWorkspaces}
        errorHandler={setError}
      />
    </section>
  );
};

export default WorkspaceListPage;
