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

const editItem = (id, name, description) => ({
  type: "EDIT_ITEM",
  payload: {
    _id: id,
    name: name,
    description: description,
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

export {
  addItem,
  editItem,
  removeItem,
  checkItem,
  clearAllItems,
  clearDoneItems,
};
