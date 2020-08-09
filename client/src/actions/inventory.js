import axios from "axios";
import { setAlert } from "./alert";
import {
  UPDATE_INVENTORY,
  GET_INVENTORY,
  ERROR_INVENTORY,
  SET_LOADING_INVENTORY,
} from "./types";

export const getInventory = (filter) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    console.log(filter);
    const insert = await axios.post("/inventory/get", filter, config);
    // const insert = await axios.post("/inventory", filter, config);

    if (insert.data.error) {
      dispatch(setAlert(insert.data.error, "danger", true));
      return;
    }

    dispatch({
      type: GET_INVENTORY,
      payload: insert.data,
    });
  } catch (err) {
    console.log("Error at getInventory", err);
    console.log(err);

    // dispatch({
    //   type: ERROR_INVENTORY,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};

export const updateInventory = (filter) => async (dispatch) => {
  try {
    setLoading();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const insert = await axios.post("/inventory", filter, config);

    if (insert.data.error) {
      dispatch(setAlert(insert.data.error, "danger", true));
      return;
    }
    // TYPE: UPDATE_INVETO needs work
    dispatch({
      type: GET_INVENTORY,
      payload: insert.data,
    });
  } catch (err) {
    console.log("Error at getInventory", err);
    console.log(err);
  }
};

// export const updatePrices = () => async (dispatch) => {
//   console.log("HELLO");
//   try {
//     const res = await axios.post("/api/development/_prices");
//     dispatch({
//       type: UPDATE_PRICES,
//       payload: res.data,
//     });
//     dispatch(getUpdatePriceStatus());
//   } catch (err) {
//     console.log("Error at updatePrices", err);
//     dispatch({
//       type: ERROR_INVENTORY,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

export const setLoading = () => {
  console.log("loading");
  return {
    type: SET_LOADING_INVENTORY,
  };
};
