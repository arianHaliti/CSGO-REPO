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
    setLoading();
    var pageURL = window.location.href;
    var lastURLSegment = pageURL.substr(pageURL.lastIndexOf("/") + 1);
    // const insert = await axios.get('/invetory')

    const update = await axios.post(`/inventory/update/${lastURLSegment}`);

    if (update.data.error) {
      dispatch(setAlert(update.data.error, "danger", false));
    }
    //WORK HERE
    console.log(filter);
    const res = await axios.get("/inventory/get", {
      params: filter,
    });

    dispatch({
      type: GET_INVENTORY,
      payload: res.data,
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
  return {
    type: SET_LOADING_INVENTORY,
  };
};
