import { v4 } from "uuid";

const addItem = (name, description, isDone = false) => ({
  type: "ADD_ITEM",
  payload: {
    _id: v4(),
    name: name,
    description: description,
    isDone: isDone,
  },
});

const removeItem = (id) => ({
  type: "REMOVE_ITEM",
  payload: id,
});

const checkItem = (id) => ({
  type: "CHECK_ITEM",
  payload: id,
});

const clearDoneItems = () => ({
  type: "CLEAR_DONE_ITEMS",
  payload: [],
});

const clearAllItems = () => ({
  type: "CLEAR_ALL_ITEMS",
  payload: [],
});

export { addItem, removeItem, checkItem, clearAllItems, clearDoneItems };
