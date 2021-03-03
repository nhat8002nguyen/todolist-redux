/* 
  - Create a itemReducer includes add,edit
  - Create reducer to update the list of items: add,remove
*/

const items = (state = [], action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return [...state, action.payload];
    case "REMOVE_ITEM":
      return state.filter((item) => item._id !== action.payload);
    case "CHECK_ITEM":
      let newState = [...state];
      for (let i = 0; i < newState.length; i++) {
        if (newState[i]._id === action.payload) {
          newState[i].isDone = !newState[i].isDone;
        }
      }
      return newState;
    case "CLEAR_DONE_ITEMS":
      let doneItems = [];
      for (let i = 0; i < state.length; i++) {
        if (state[i].isDone === false) {
          doneItems.push(state[i]);
        }
      }
      return doneItems;
    case "CLEAR_ALL_ITEMS":
      return action.payload;
    default:
      return state;
  }
};

export { items };
