import { combineReducers } from "redux";
import alert from "./alert";
import item from "./items";
import inventory from "./inventory";

export default combineReducers({
  alert,
  item,
  inventory,
});
