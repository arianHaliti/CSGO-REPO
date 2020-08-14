import { GET_USERS, ERROR_USERS, SET_LOADING_USERS } from "../actions/types";
const initialState = {
  users: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case ERROR_USERS:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_LOADING_USERS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
