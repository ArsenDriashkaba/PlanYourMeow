import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import userContext from "../../context/userContext";

import api from "../../Api";
import "./WorkspaceDetailPage.css";

import BoardList from "../../Components/Board/BoardList/BoardList";
import CreateInput from "../../Components/CreateInput/CreateInput";

const WorkspaceDetailPage = () => {
  const userCtx = useContext(userContext);

  const { id } = useParams();
  const [workspace, setWorkspace] = useState([]);
  const [boards, setBoards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [isChange, setIsChange] = useState(false);
  const [userRole, setUserRole] = useState();

  const setFetchedBoards = () => {
    api
      .get(`/boards`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => setBoards(res.data))
      .catch((error) => setError(error));

    console.log("Boards are fetched!");
  };

  useEffect(() => {
    setLoading(true);

    api
      .get(`/workspaces/${id}`, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then((res) => setWorkspace(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(setFetchedBoards, []);

  // finding userRole
  useEffect(() => {
    if (userCtx.userId) {
      api
        .get(`/userTeamRoles/${userCtx.userId}/${id}`)
        .then((res) => {
          setUserRole(res.data[0].userRoles[0].roleId);
        })
        .catch((error) => setError(error));
    }
  }, [id, userCtx.userId]);

  const filteredBoardsByWorkspace = boards.filter(
    (board) => board.workspaceId === parseInt(id)
  );
  const adminRole = userRole === 1 || userRole === 2;

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
        {adminRole && (
          <CreateInput
            elementId={id}
            fetchData={setFetchedBoards}
            targetId={"workspaceId"}
            postUrl={"boards"}
          />
        )}
      </header>
      <hr />
      <BoardList
        boards={filteredBoardsByWorkspace}
        fetchData={setFetchedBoards}
        errorHandler={setError}
        isChange={isChange}
        setIsChange={setIsChange}
        adminRole={adminRole}
      />
    </section>
  );
};

export default WorkspaceDetailPage;
