import axios from "axios";
import { GET_USERS, ERROR_USERS, SET_LOADING_USERS } from "./types";

export const getUsers = (filter = null) => async (dispatch) => {
  try {
    dispatch(setLoading());

    const res = await axios.get("/api/users/users", {
      params: filter,
    });
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    console.log("Error at getItems", err);
    dispatch({
      type: ERROR_USERS,
      payload: { msg: err, status: err },
    });
  }
};

export const setLoading = () => {
  return {
    type: SET_LOADING_USERS,
  };
};
