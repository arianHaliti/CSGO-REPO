import {
  UPDATE_PRICES,
  GET_ITEMS,
  ERROR_ITEM,
  GET_STATUS_PRICE,
  SET_LOADING_ITEM,
} from "../actions/types";
const initialState = {
  items: [],
  loading: true,
  error: {},
  invetoryStatus: [],
};
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false,
      };

    case GET_STATUS_PRICE:
      return {
        ...state,
        invetoryStatus: payload,
      };
    case UPDATE_PRICES:
      return {
        ...state,
        pricesItem: payload,
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case SET_LOADING_ITEM:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
