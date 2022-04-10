import { useState } from "react";

import api from "../../Api";

const CreateInput = ({ elementId, fetchData, targetId, postUrl }) => {
  const [elementInfo, setElementInfo] = useState({});
  const [error, setError] = useState();

  const inputTextHandler = (event) => {
    const elementName = event.target.value;
    const newElement = { name: elementName };

    if (targetId) {
      newElement[targetId] = elementId;
    }

    setElementInfo(newElement);
  };

  const submitToHandler = (event) => {
    event.preventDefault();

    if (elementInfo === {} || elementInfo.name == null) {
      return;
    }

    api
      .post(`/${postUrl}`, elementInfo)
      .then(() => {
        console.log("Element added");
        fetchData();
      })
      .catch((error) => setError(error))
      .finally(setElementInfo({}));
  };

  return (
    <form className="create-element">
      <input
        type="text"
        value={elementInfo.name ? elementInfo.name : ""}
        onChange={inputTextHandler}
      />
      <button className="add-element" type="submit" onClick={submitToHandler}>
        +
      </button>
      {error && <p>Error occured :c</p>}
    </form>
  );
};

export default CreateInput;
