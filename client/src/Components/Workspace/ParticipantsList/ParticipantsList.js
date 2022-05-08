import ParticipantPreview from "../ParticipantPreview/ParticipantPreview";

import "./ParticipantsList.css";

const ParticipantsList = ({ participants, workspaceId }) => {
  return (
    <div id="workspace-participants">
      {participants?.map((participant) => (
        <ParticipantPreview
          workspaceId={workspaceId}
          key={participant?.id}
          userInfo={participant}
        />
      ))}
    </div>
  );
};

export default ParticipantsList;
