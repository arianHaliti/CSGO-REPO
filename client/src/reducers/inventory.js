import {
  UPDATE_INVENTORY,
  GET_INVENTORY,
  ERROR_INVENTORY,
  SET_LOADING_INVENTORY,
} from "../actions/types";
const initialState = {
  inv: [],
  loading: true,
  error: {},
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_INVENTORY:
      return {
        ...state,
        inv: payload,
        loading: false,
      };
    case UPDATE_INVENTORY:
      return {
        ...state,
        inv: payload,
      };
    case ERROR_INVENTORY:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_LOADING_INVENTORY:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
