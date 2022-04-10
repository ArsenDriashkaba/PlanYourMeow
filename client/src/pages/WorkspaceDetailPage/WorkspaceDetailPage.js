import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../Api";
import "./WorkspaceDetailPage.css";

import BoardList from "../../Components/Board/BoardList/BoardList";
import CreateInput from "../../Components/CreateInput/CreateInput";

const WorkspaceDetailPage = () => {
  const { id } = useParams();
  const [workspace, setWorkspace] = useState([]);
  const [boards, setBoards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const setFetchedBoards = () => {
    api
      .get(`/boards`)
      .then((res) => setBoards(res.data))
      .catch((error) => setError(error));

    console.log("Boards are fetched!");
  };

  useEffect(() => {
    setLoading(true);

    api
      .get(`/workspaces/${id}`)
      .then((res) => setWorkspace(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(setFetchedBoards, []);

  const filteredBoardsByWorkspace = boards.filter(
    (board) => board.workspaceId === parseInt(id)
  );

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
      <BoardList
        boards={filteredBoardsByWorkspace}
        fetchData={setFetchedBoards}
        errorHandler={setError}
      />
      <CreateInput
        elementId={id}
        fetchData={setFetchedBoards}
        targetId={"workspaceId"}
        postUrl={"boards"}
      />
    </section>
  );
};

export default WorkspaceDetailPage;
