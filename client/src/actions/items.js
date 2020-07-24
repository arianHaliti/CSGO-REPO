import axios from "axios";
import {
  UPDATE_PRICES,
  GET_ITEMS,
  ERROR_ITEM,
  GET_STATUS_PRICE,
} from "./types";

export const getItems = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/items/items");
    dispatch({
      type: GET_ITEMS,
      payload: res.data,
    });
    dispatch(getUpdatePriceStatus());
  } catch (err) {
    console.log("Error at getItems", err);
    dispatch({
      type: ERROR_ITEM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updatePrices = () => async (dispatch) => {
  console.log("HELLO");
  try {
    const res = await axios.post("/api/development/_prices");
    dispatch({
      type: UPDATE_PRICES,
      payload: res.data,
    });
    dispatch(getUpdatePriceStatus());
  } catch (err) {
    console.log("Error at updatePrices", err);
    dispatch({
      type: ERROR_ITEM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getUpdatePriceStatus = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/development/_prices_status");
    dispatch({
      type: GET_STATUS_PRICE,
      payload: res.data,
    });
  } catch (err) {
    console.log("Error at getUpdatePriceStatus", err);
    dispatch({
      type: ERROR_ITEM,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
