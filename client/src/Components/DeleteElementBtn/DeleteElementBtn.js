import { useState } from "react";

import "./DeleteElementBtn.css";

import api from "../../Api";

const DeleteElementBtn = ({ reqUrl, elementId, fetchData, errorHandler }) => {
  const [error, setError] = useState();

  const deleteElement = () => {
    api
      .delete(`/${reqUrl}/${elementId}`)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => {
        setError(error);
        errorHandler(error);
      });
  };

  if (error) {
    return <p>Error occured :c</p>;
  }

  return (
    <button className="delete-element-btn" onClick={deleteElement}>
      X
    </button>
  );
};

export default DeleteElementBtn;
