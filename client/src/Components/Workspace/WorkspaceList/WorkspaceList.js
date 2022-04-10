import WorkspacePreview from "../WorkspacePreview/WorkspacePreview";
import "./WorkspaceList.css";

const WorkspaceList = ({ workspaces, fetchData, errorHandler }) => {
  return (
    <div className="workspace-list">
      {workspaces.map((workspace) => (
        <WorkspacePreview
          name={workspace?.name}
          workspace_id={workspace.id}
          fetchData={fetchData}
          errorHandler={errorHandler}
        />
      ))}
    </div>
  );
};

export default WorkspaceList;
