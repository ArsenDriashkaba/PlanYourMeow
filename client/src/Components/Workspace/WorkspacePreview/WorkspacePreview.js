import { Link } from "react-router-dom";
import "./WorkspacePreview.css";
import DeleteElementBtn from "../../DeleteElementBtn/DeleteElementBtn";

const WorkspacePreview = ({ name, workspace_id, fetchData, errorHandler }) => {
  return (
    <div className="workspace-preview">
      <div className="workspace-header">
        <Link className="workspace-name" to={`/workspaces/${workspace_id}`}>
          <h2>{name}</h2>
        </Link>
        <DeleteElementBtn
          reqUrl={"workspaces"}
          elementId={workspace_id}
          fetchData={fetchData}
          errorHandler={errorHandler}
        />
      </div>
      <hr />
      <p>Number of participants: {0}</p>
    </div>
  );
};

export default WorkspacePreview;
