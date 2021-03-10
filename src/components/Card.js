import { CardUpdate } from "./CardUpdate";
import { useBoard } from "../contexts/BoardContext";
import "./Card.css";

export const Card = props => {
  const { card, onDragStart } = props;
  const { timeId, taskText, isEditingTask } = card;
  const { updateTaskCard, removeCardFromColumn } = useBoard();

  const handleEditingClick = event => {
    event.preventDefault();
    const item = { ...card };

    item.isEditingTask = true;
    updateTaskCard?.(item);
  };

  const handleEditUpdate = newValue => {
    if (newValue === "") newValue = taskText;
    const item = { ...card };

    item.taskText = newValue;
    item.isEditingTask = false;

    updateTaskCard?.(item);
  };

  return (
    <div className="card-item">
      <div className={`${isEditingTask ? "editing" : ""}`}>
        <div className="task-card-wrapper">
          <div
            id={[timeId]}
            draggable="true"
            className="task-card"
            onDragStart={onDragStart}
            onDoubleClick={handleEditingClick}
          >
            {taskText}
          </div>

          <button type="button" onClick={() => removeCardFromColumn(card)}>
            x
          </button>
        </div>

        {isEditingTask ? <CardUpdate {...{ taskText, handleEditUpdate }} /> : null}
      </div>
    </div>
  );
};
