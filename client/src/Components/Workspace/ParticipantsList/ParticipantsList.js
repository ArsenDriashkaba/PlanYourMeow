import ParticipantPreview from "../ParticipantPreview/ParticipantPreview";

import "./ParticipantsList.css";

const ParticipantsList = ({ participants }) => {
  return (
    <div id="workspace-participants">
      {participants.map((participant) => (
        <ParticipantPreview userInfo={participant} />
      ))}
    </div>
  );
};

export default ParticipantsList;
