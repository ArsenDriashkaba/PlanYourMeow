import Board from "../Board";

const BoardList = ({ boards }) => {
  return (
    <div className="board-list">
      {boards?.map((board) => (
        <Board key={board.id} name={board?.name} board_id={board?.id} />
      ))}
    </div>
  );
};

export default BoardList;
