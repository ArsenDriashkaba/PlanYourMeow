import { Link } from "react-router-dom";
import "./style.css";

const WorkspacePreview = ({ name, workspace_id }) => {
  return (
    <div className="workspace-preview">
      <Link to={`/workspaces/${workspace_id}`}>
        <h2>{name}</h2>
      </Link>
      <p>Number of participants: {0}</p>
    </div>
  );
};

export default WorkspacePreview;
