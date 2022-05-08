import { useState } from "react";

import "./Description.css";

const Description = ({
  description,
  editMode,
  elementInfo,
  setElementParams,
}) => {
  const [elementDescription, setElementDescription] = useState(description);

  const changeDescription = (event) => {
    const newElementInfo = { ...elementInfo };
    const value = event.target.value;

    setElementDescription(value);

    newElementInfo.description = value;

    setElementParams(newElementInfo);
  };

  return (
    <div id="element-description">
      <h2>Description:</h2>
      <p>
        {editMode ? (
          <textarea
            className="description-text-area"
            value={elementDescription ? elementDescription : ""}
            onChange={changeDescription}
          ></textarea>
        ) : (
          description
        )}
      </p>
    </div>
  );
};

export default Description;
