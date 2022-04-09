import { useEffect, useState } from "react";

import api from "../../Api";
import "./WorkspaceListPage.css";

import SearchInput from "../../Components/SearchInput/SearchInput";
import WorkspaceList from "../../Components/Workspace/WorkspaceList/WorkspaceList";

const WorkspaceListPage = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, setSearchValue] = useState("");

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace?.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    setLoading(true);

    api
      .get("/workspaces")
      .then((res) => setWorkspaces(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="all-workspaces-section">
      <header id="workspaces-main-header">
        <h1>All workspaces</h1>
        <SearchInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </header>
      {isLoading && <p>Page is loading</p>}
      {error && <p>Page error :c</p>}
      <WorkspaceList workspaces={filteredWorkspaces} />
    </section>
  );
};

export default WorkspaceListPage;
