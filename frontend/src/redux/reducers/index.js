import { combineReducers } from "redux";
import userReducer from "./userReducer"; // Example reducer

export default combineReducers({
  user: userReducer,
});
