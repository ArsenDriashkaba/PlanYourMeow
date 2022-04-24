import { useState } from "react";

import "./ParticipantPreview.css";

const ParticipantPreview = ({ userInfo }) => {
  const [error, setError] = useState();
  const [editingState, setEditingState] = useState(false);

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <div className="participant-preview">
      <h2>{userInfo?.name}</h2>
      {editingState ? (
        <form action="submit">
          <select name="role" id="role">
            <option value="">admin</option>
            <option value="">reader</option>
            <option value="">default</option>
          </select>
          <button onClick={() => setEditingState(false)}>Ok</button>
        </form>
      ) : (
        <button onClick={() => setEditingState(true)}>Change</button>
      )}
    </div>
  );
};

export default ParticipantPreview;
