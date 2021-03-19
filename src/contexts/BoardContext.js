import data from "../data";
import { createContext, useContext, useState } from "react";

function generateDefaultColumn() {
  return {
    title: "New column",
    isEditingTitle: false,
    id: new Date().valueOf(),
    cards: [],
  };
}

// get latest state value
function getCurrentState() {
  const rawLS = localStorage.getItem("lists");
  return JSON.parse(rawLS);
}

const BoardContext = createContext();

function BoardProvider(props) {
  const { Provider } = BoardContext;

  /**
   * state initializer function
   * First, check if lists exist in location storage
   * fetch it then parse it and return as default state
   *
   * If not (new instance of app), set the default provider by app
   */
  const [lists, setLists] = useState(() => {
    if (localStorage.getItem("lists")) {
      return getCurrentState();
    } else {
      localStorage.setItem("lists", JSON.stringify(data));
      return data;
    }
  });

  // get latest state value and sync the state and localStorage
  const setCurrentState = updatedState => {
    setLists(updatedState);
    localStorage.setItem("lists", JSON.stringify(updatedState));
  };

  // get id of item being dragged and list where it's coming from
  const onDragStart = (e, fromList) => {
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromList: fromList,
    };

    localStorage.setItem("dragInfo", JSON.stringify(dragInfo));
  };

  const onDragOver = e => e.preventDefault();

  const onDrop = (e, listNum) => {
    const parsedLS = [...getCurrentState()];

    const droppedTask = localStorage.getItem("dragInfo");
    const parsedDragInfo = JSON.parse(droppedTask);

    // get index from current location and index for new location
    const fromLocationIndex = parsedLS.findIndex(list => list.id === +parsedDragInfo.fromList);
    const toLocationIndex = parsedLS.findIndex(list => list.id === +listNum);

    // get task cards array, get rid of moved card, and put a new card
    // in the list where it was dropped
    const { cards } = parsedLS.find(list => list.id === +parsedDragInfo.fromList);
    const taskCard = cards.find(card => card.timeId === +parsedDragInfo.taskId);
    const indexOfCard = cards.findIndex(card => card.timeId === +parsedDragInfo.taskId);

    parsedLS[fromLocationIndex].cards.splice(indexOfCard, 1);
    parsedLS[toLocationIndex].cards.push({ ...taskCard, listNumber: parseInt(listNum) });

    setCurrentState(parsedLS);
  };

  /**
   *
   * Takes in the task or card title and column id to set the information
   * in the correction location
   *
   * @param {String} cardTitle New card title
   * @param {String} listNumber Card parent id; column id
   */
  const addTaskCard = (cardTitle, listNumber) => {
    const currentState = [...getCurrentState()];

    const newTask = {
      listNumber,
      taskText: cardTitle,
      isEditingTask: false,
      timeId: new Date().valueOf(),
    };

    const updatedList = currentState.map(list => {
      if (list.id === listNumber) {
        return {
          ...list,
          cards: [...list.cards, newTask],
        };
      }

      return list;
    });

    setCurrentState(updatedList);
  };

  /**
   *
   * Takes the updated card information and updates the list array
   * @param card single card type { taskText, listNumber, timeId, isEditingTask }
   */
  const updateTaskCard = card => {
    const currentState = [...getCurrentState()];

    const updatedList = currentState.map(list => {
      if (list.id === card.listNumber) {
        const correctCardInformation = list.cards.map(item => {
          if (item.timeId === card.timeId) return card;
          return item;
        });

        return {
          ...list,
          cards: correctCardInformation,
        };
      }

      return list;
    });

    setCurrentState(updatedList);
  };

  /**
   *
   * Takes the current card timeId value and removes it from the cards array
   * @param card single card item
   */
  const removeCardFromColumn = card => {
    const currentState = [...getCurrentState()];

    const updatedList = currentState.map(list => {
      if (list.id === card.listNumber) {
        return {
          ...list,
          cards: list.cards.filter(item => item.timeId !== card.timeId),
        };
      }

      return list;
    });

    setCurrentState(updatedList);
  };

  /**
   *
   * Create a new column in the board view.
   * Take the default column setup and append to the list array
   */
  const addNewColumn = () => {
    const currentState = [...getCurrentState()];
    const updatedLists = [...currentState, generateDefaultColumn()];

    setCurrentState(updatedLists);
  };

  /**
   *
   * Takes the updated column information and updates the list array
   * @param item single column type { id, title, isEditing, cards }
   */
  const updateColumnTitle = item => {
    const newLists = [...getCurrentState()];
    const itemToUpdate = newLists.findIndex(list => list.id === item.id);

    if (itemToUpdate > -1) newLists[itemToUpdate] = item;
    setCurrentState(newLists);
  };

  /**
   *
   * Takes the current column value and removes it from the list array
   * @param itemId single column item id
   */
  const removeColumnFromLists = itemId => {
    let newLists = [...getCurrentState()];
    newLists = newLists.filter(list => list.id !== itemId);

    setCurrentState(newLists);
  };

  return (
    <Provider
      value={{
        lists,
        onDrop,
        onDragOver,
        addTaskCard,
        onDragStart,
        addNewColumn,
        updateTaskCard,
        updateColumnTitle,
        removeCardFromColumn,
        removeColumnFromLists,
      }}
      {...props}
    />
  );
}

function useBoard() {
  const context = useContext(BoardContext);

  if (context === undefined) {
    throw new Error("useBoard must be used within a BoardProvider");
  }

  return context;
}

export { useBoard };
export default BoardProvider;
