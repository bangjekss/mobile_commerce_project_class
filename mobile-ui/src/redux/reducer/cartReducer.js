import {
  API_LOADING_FAILED,
  API_LOADING_SUCCESS,
  NULLIFY_ERROR,
  API_LOADING_START,
  GET_CART,
  AUTH_LOGOUT,
  ADD_TO_CART,
} from '../type';

const INITIAL_STATE = {
  cart: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case API_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    case API_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case API_LOADING_FAILED:
      return {
        ...state,
        isLoading: true,
        isError: true,
        errorMessage: action.payload,
      };
    case NULLIFY_ERROR:
      return {
        ...state,
        isError: false,
        errorMessage: null,
      };
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default cartReducer;
