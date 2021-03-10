import { Card } from "./Card";
import { AddCard } from "./AddCard";
import { ColumnLabel } from "./ColumnLabel";
import { useBoard } from "../contexts/BoardContext";
import "./Column.css";

export const Column = props => {
  const { updateColumnTitle, removeColumnFromLists } = useBoard();

  const { list, onAdd, onDragStart, onDrop, onDragOver } = props;
  const { id, title, isEditingTitle, cards } = list;

  const handleEditingClick = event => {
    event.preventDefault();
    const item = { ...list };

    item.isEditingTitle = true;
    updateColumnTitle?.(item);
  };

  const handleEditUpdate = value => {
    if (value === "") value = title;
    const item = { ...list };

    item.title = value;
    item.isEditingTitle = false;

    updateColumnTitle?.(item);
  };

  return (
    <div>
      <div className={`header ${isEditingTitle ? "editing" : ""}`}>
        <div className="heading-container">
          <h2 onDoubleClick={handleEditingClick}>{title}</h2>
          <button type="button" onClick={() => removeColumnFromLists(id)}>
            X
          </button>
        </div>

        {isEditingTitle ? <ColumnLabel title={title} updateLabelValue={handleEditUpdate} /> : null}
      </div>

      <ul onDragOver={onDragOver} onDrop={onDrop} className="list">
        {cards.map((card, index) => {
          return (
            <li className="list-item" key={index}>
              <Card card={card} onDragStart={onDragStart} />
            </li>
          );
        })}

        <li>
          <AddCard listNum={id} onAdd={onAdd} />
        </li>
      </ul>
    </div>
  );
};
