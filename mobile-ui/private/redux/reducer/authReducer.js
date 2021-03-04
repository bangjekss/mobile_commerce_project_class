const {
  API_LOADING_START,
  API_LOADING_SUCCESS,
  API_LOADING_FAILED,
  NULLIFY_ERROR,
  AUTH_LOGOUT,
  AUTH_SIGN,
  GET_ADDRESS,
} = require('../type');

const INITIAL_STATE = {
  id: null,
  username: null,
  email: null,
  roleID: 0,
  isLogin: false,
  isLoading: false,
  isError: false,
  errorMessage: null,
  address: [],
};

const authReducer = (state = INITIAL_STATE, action) => {
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
    case AUTH_SIGN:
      return {
        ...state,
        id: action.payload.id, // response.data
        username: action.payload.username,
        email: action.payload.email,
        roleID: action.payload.roleID,
        isLogin: true,
      };
    case AUTH_LOGOUT:
      return INITIAL_STATE;
    case GET_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
