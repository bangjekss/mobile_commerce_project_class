import {
  API_LOADING_FAILED,
  API_LOADING_SUCCESS,
  NULLIFY_ERROR,
  API_LOADING_START,
  GET_PRODUCTS,
} from '../type';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  productList: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
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
    case GET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
