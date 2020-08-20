import axios from "axios";
import {
  UPDATE_PRICES,
  GET_ITEMS,
  ERROR_ITEM,
  GET_STATUS_PRICE,
  SET_LOADING_ITEM,
} from "./types";

export const getItems = (filter = null) => async (dispatch) => {
  try {
    dispatch(setLoading());
    console.log(filter);
    const res = await axios.get("/api/items/items", {
      params: filter,
    });
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

export const setLoading = () => {
  return {
    type: SET_LOADING_ITEM,
  };
};
