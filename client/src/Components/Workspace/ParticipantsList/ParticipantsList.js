import ParticipantPreview from "../ParticipantPreview/ParticipantPreview";

import "./ParticipantsList.css";

const ParticipantsList = ({
  participants,
  workspaceId,
  updateWorkspaceInfo,
  userRole,
}) => {
  return (
    <div id="workspace-participants">
      {participants?.map((participant) => (
        <ParticipantPreview
          workspaceId={workspaceId}
          key={participant?.id}
          userInfo={participant}
          updateWorkspaceInfo={updateWorkspaceInfo}
          userRole={userRole}
        />
      ))}
    </div>
  );
};

export default ParticipantsList;
