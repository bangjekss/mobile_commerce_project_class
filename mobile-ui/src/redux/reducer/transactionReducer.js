import {
  API_LOADING_FAILED,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  AUTH_LOGOUT,
  NULLIFY_ERROR,
  GET_TRANSACTION,
} from '../type';

const INITIAL_STATE = {
  transactionList: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
};

const transactionReducer = (state = INITIAL_STATE, action) => {
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
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case NULLIFY_ERROR:
      return {
        ...state,
        isError: false,
        errorMessage: null,
      };
    case GET_TRANSACTION:
      return {
        ...state,
        transactionList: action.payload,
      };
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default transactionReducer;
