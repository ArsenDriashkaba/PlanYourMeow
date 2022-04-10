import Board from "../Board";
import "./BoardList.css";

const BoardList = ({ boards, fetchData, errorHandler }) => {
  return (
    <div className="board-list">
      {boards?.map((board) => (
        <Board
          key={board.id}
          name={board?.name}
          board_id={board?.id}
          tickets={board?.tickets}
          fetchData={fetchData}
          errorHandler={errorHandler}
        />
      ))}
    </div>
  );
};

export default BoardList;
