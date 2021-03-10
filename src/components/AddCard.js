import { useState } from "react";
import "./Card.css";

export const AddCard = props => {
  const { listNum, onAdd } = props;
  const [editing, setEditing] = useState(false);

  const handleFormSubmit = event => {
    event.preventDefault();

    const { newItem } = event.target.elements;

    if (newItem.value !== "") {
      onAdd(newItem.value, listNum);
      newItem.value = "";
      newItem.focus();
    } else {
      newItem.focus();
    }
  };

  return !editing ? (
    <div className="open-add-button">
      <button type="button" onClick={() => setEditing(true)}>
        + Add new task
      </button>
    </div>
  ) : (
    <form onSubmit={handleFormSubmit} className="form">
      <input
        autoFocus
        type="text"
        id="newItem"
        aria-label="Add a task"
        placeholder="Add new task"
      />

      <div className="button-container">
        <button type="submit">Add Task</button>
        <button type="button" onClick={() => setEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );
};
