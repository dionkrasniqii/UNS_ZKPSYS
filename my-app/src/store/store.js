import { createStore, combineReducers } from "redux";
import professorListReducer from "./professorsListReducers";

const rootReducer = combineReducers({
  professorList: professorListReducer,
});

const store = createStore(rootReducer);

export default store;
