import { useState } from "react";

import "./ElementPageHeader.css";

const ElementPageHeader = ({
  name,
  editMode,
  toggleEditMode,
  elementInfo,
  setElementParams,
  updateElementInfo,
}) => {
  const [elementName, setElementName] = useState(name);

  const changeName = (event) => {
    const newElementInfo = { ...elementInfo };
    const value = event.target.value;

    newElementInfo.name = value;
    setElementName(value);

    setElementParams(newElementInfo);
  };

  const saveEventHandler = () => {
    updateElementInfo();
    toggleEditMode();
  };

  return (
    <>
      <header id="element-page-header">
        <h1>
          {editMode ? (
            <input value={elementName} onChange={changeName}></input>
          ) : (
            name
          )}
        </h1>

        {editMode ? (
          <button className="edit-save-btn" onClick={saveEventHandler}>
            Save
          </button>
        ) : (
          <button className="edit-save-btn" onClick={toggleEditMode}>
            Edit
          </button>
        )}
      </header>
      <hr />
    </>
  );
};

export default ElementPageHeader;
