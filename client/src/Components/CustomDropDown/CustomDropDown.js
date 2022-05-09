import { useState } from "react";

import api from "../../Api";

import "./CustomDropDown.css";

const CustomDropDown = ({
  paramId,
  currElem,
  arrOfOptions,
  url,
  elemId,
  fetchData,
}) => {
  const [error, setError] = useState();
  const [editingState, setEditingState] = useState(false);
  const [chosenElem, setChosenElem] = useState();

  const handleStateChange = (event) => {
    event.preventDefault();

    if (!chosenElem) {
      setEditingState(false);
      return;
    }

    const data = {};
    data[paramId] = chosenElem;

    api
      .patch(`/${url}/${elemId}`, data, {
        headers: { "auth-token": localStorage.getItem("id_token") },
      })
      .then(() => {
        fetchData();
      })
      .catch((error) => setError(error));

    setEditingState(false);
  };

  const defaultLabel = arrOfOptions.filter(
    (option) => option?.label === currElem
  )[0]?.label;

  if (error) {
    return <p>Error occured ;c</p>;
  }

  return (
    <>
      {editingState ? (
        <form action="submit" onSubmit={handleStateChange}>
          <select onChange={(event) => setChosenElem(event.target.value)}>
            <option value={currElem}>{defaultLabel ? defaultLabel : ""}</option>

            {arrOfOptions?.map((option) => {
              if (option.label !== currElem) {
                return <option value={option?.label}>{option?.label}</option>;
              }
              return <></>;
            })}
          </select>

          <button type="submit">Ok</button>
        </form>
      ) : (
        <>
          <span>{defaultLabel}</span>
          <button onClick={() => setEditingState(true)}>Change</button>
        </>
      )}
    </>
  );
};

export default CustomDropDown;
