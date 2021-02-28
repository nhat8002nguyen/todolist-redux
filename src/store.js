import { createStore, combineReducers } from "redux";
import { items } from "./reducers/itemsReducer";

const reducer = combineReducers({
  items: items,
});

const initialState = {
  items: [
    {
      _id: 1,
      name: "Read React book",
      description: "Read Chapter 2,3",
      isDone: false,
    },
    {
      _id: 2,
      name: "Solve coding challenge",
      description: "solve 1 java and 1 javascript",
      isDone: false,
    },
    {
      _id: 3,
      name: "Design side project",
      description: "Design functionality of it",
      isDone: false,
    },
  ],
};

const store = createStore(reducer, initialState);

export default store;
