import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

import api from "../../../Api";

import Board from "../Board";
import "./BoardList.css";

const BoardList = ({
  boards,
  fetchData,
  errorHandler,
  isChange,
  setIsChange,
  userRole,
}) => {
  const handleDND = ({ destination, draggableId }) => {
    if (!destination) {
      return;
    }

    const boardId = destination.droppableId;
    const ticketId = draggableId;

    api
      .patch(
        `/tickets/${ticketId}`,
        { boardId: boardId },
        {
          headers: { "auth-token": localStorage.getItem("id_token") },
        }
      )
      .then(() => {
        setIsChange(!isChange);
      })
      .catch((error) => console.log(error));
  };

  return (
    <DragDropContext onDragEnd={(event) => handleDND(event)}>
      <div className="board-list">
        {boards?.map((board) => (
          <Board
            key={board.id}
            name={board?.name}
            board_id={board?.id}
            boardTickets={board?.tickets}
            fetchData={fetchData}
            errorHandler={errorHandler}
            isChange={isChange}
            setIsChange={setIsChange}
            userRole={userRole}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardList;
