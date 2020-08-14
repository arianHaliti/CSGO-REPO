import { combineReducers } from "redux";
import alert from "./alert";
import item from "./items";
import inventory from "./inventory";
import users from "./users";

export default combineReducers({
  alert,
  item,
  inventory,
  users,
});
