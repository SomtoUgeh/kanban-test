import { Column } from "./Column";
import { useBoard } from "../contexts/BoardContext";
import "./Board.css";

const FullBoard = () => {
  const { lists, onDrop, addNewColumn, onDragOver, addTaskCard, onDragStart } = useBoard();

  return (
    <div className="board">
      <h1>My Kanban Board</h1>

      <div>
        <ul className="lists">
          {lists.map((list, index) => (
            <li key={index} className="list-wrapper">
              <Column
                list={list}
                onDragOver={e => onDragOver(e)}
                onDrop={e => onDrop(e, `${list.id}`)}
                onDragStart={e => onDragStart(e, `${list.id}`)}
                onAdd={(cardTitle, listNumber) => addTaskCard(cardTitle, listNumber)}
              />
            </li>
          ))}

          <li className="list-wrapper">
            <button type="button" className="add" onClick={addNewColumn}>
              + Add a column!
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FullBoard;
