import { Column } from "./Column";
import { useBoard } from "../contexts/BoardContext";
import "./Board.css";

const FullBoard = () => {
  const { lists, onDrop, addNewColumn, onDragOver, addTaskCard, onDragStart } = useBoard();

  return (
    <div className="board">
      <h1>My Kanban Board</h1>

      <details>
        <summary>How to use</summary>
        <ol>
          <li>
            Create columns by clicking on the <kbd>Add a column</kbd> button
          </li>
          <li>Edit column title by double clicking on the title itself</li>
          <li>
            Delete column by clicking on the <kbd>X</kbd> opposite the title
          </li>
          <li>
            Add new tasks by clicking on the <kbd>Add new task</kbd> button
          </li>
          <li>Edit task title by double clicking on the title itself</li>
          <li>
            Delete cards by hovering on the cards and clicking on the <kbd>X</kbd>
          </li>
        </ol>
      </details>

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
