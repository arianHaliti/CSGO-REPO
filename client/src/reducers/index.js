import { combineReducers } from "redux";
import alert from "./alert";
import item from "./items";

export default combineReducers({
  alert,
  item,
});
