import React, { useState } from "react";
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
}) => {
  const [dnd, setDnd] = useState(false);

  const handleDND = (dndEvent) => {
    console.log(dndEvent);
    const boardId = dndEvent.destination.droppableId;
    const ticketId = dndEvent.draggableId;

    api
      .patch(`/tickets/${ticketId}`, { boardId: boardId })
      .then((res) => {
        setDnd(true);
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
            dnd={dnd}
            setDnd={dnd}
            isChange={isChange}
            setIsChange={setIsChange}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardList;
