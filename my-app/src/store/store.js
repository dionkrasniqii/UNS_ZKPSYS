import { createStore, combineReducers } from "redux";
import professorListReducer from "./professorsListReducers";

const rootReducer = combineReducers({
  professorList: professorListReducer,
  // Add other reducers here if necessary
});

const store = createStore(rootReducer);

export default store;
