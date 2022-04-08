import { Link } from "react-router-dom";

const WorkspacePreview = ({ name, id }) => {
  return (
    <div className="workspace-preview">
      <Link to={`/workspace/${id}`}>
        <h2>{name}</h2>
      </Link>
      <p>Number of participants: {0}</p>
    </div>
  );
};

export default WorkspacePreview;
