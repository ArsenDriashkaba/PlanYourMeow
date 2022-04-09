import WorkspacePreview from "../WorkspacePreview/WorkspacePreview";

const WorkspaceList = ({ workspaces }) => {
  return (
    <div className="workspace-list">
      {workspaces.map((workspace) => (
        <WorkspacePreview name={workspace?.name} workspace_id={workspace.id} />
      ))}
    </div>
  );
};

export default WorkspaceList;
