import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../Api";
import "./WorkspaceDetailPage.css";

import BoardList from "../../Components/Board/BoardList/BoardList";

const WorkspaceDetailPage = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get(`/workspaces/${id}`)
      .then((res) => setWorkspace(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (isLoading) {
    return <p>Is loading</p>;
  }

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <section id="board-list-section">
      <header id="board-list-header">
        <h1>{workspace?.name}</h1>
        <button id="invite-member">Invite</button>
      </header>
      <hr />
      <BoardList boards={workspace?.boards} />
    </section>
  );
};

export default WorkspaceDetailPage;
