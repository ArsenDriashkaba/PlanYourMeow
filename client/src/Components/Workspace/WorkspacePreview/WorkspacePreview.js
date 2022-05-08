import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../../../Api";
import userContext from "../../../context/userContext";

import "./WorkspacePreview.css";

import DeleteElementBtn from "../../DeleteElementBtn/DeleteElementBtn";

const WorkspacePreview = ({ name, workspace_id, fetchData, errorHandler }) => {
  const [userRole, setUserRole] = useState();
  const [error, setError] = useState();
  const userCtx = useContext(userContext);

  useEffect(() => {
    if (userCtx.userId) {
      api
        .get(`/userTeamRoles/${userCtx.userId}/${workspace_id}`)
        .then((res) => {
          setUserRole(res.data[0].userRoles[0].roleId);
        })
        .catch((error) => setError(error));
    }
  }, [workspace_id, userCtx.userId]);

  if (error) {
    return <p>Error occured ;c</p>;
  }

  const adminOfWorkspace = userRole === 1 || userRole === 2;

  return (
    <div className="workspace-preview">
      <div className="workspace-header">
        <Link className="workspace-name" to={`/workspaces/${workspace_id}`}>
          <h2>{name}</h2>
        </Link>
        {adminOfWorkspace && (
          <DeleteElementBtn
            reqUrl={"workspaces"}
            elementId={workspace_id}
            fetchData={fetchData}
            errorHandler={errorHandler}
          />
        )}
      </div>
      <hr />
      <p>Number of participants: {0}</p>
    </div>
  );
};

export default WorkspacePreview;
