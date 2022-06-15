import { combineReducers, createStore } from "redux";
import { usersReducer } from "./users/reducer";
import { apartmentsReducer } from "./apartments/reducer";

const reducers = combineReducers({
  users: usersReducer,
  apartments: apartmentsReducer,
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
