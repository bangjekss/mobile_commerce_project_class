import axios from 'axios';
import {
  API_LOADING_FAILED,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  AUTH_LOGOUT,
  AUTH_SIGN,
  GET_ADDRESS,
  GET_CART,
  NULLIFY_ERROR,
} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCartAction} from './cartAction';

const {local} = require('../../../local_ip');

const url = `${local}/user`;

// login, register, keep-login

const loginAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const response = await axios.post(`${url}/login`, payload);
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      dispatch({type: AUTH_SIGN, payload: response.data});
      dispatch(getCartAction(response.data.id));
      dispatch(getAddressAction(response.data.id));
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);

      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
      // alert(err.response.data.error);
    }
  };
};
const registerAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const response = await axios.post(`${url}/register`, payload);
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      dispatch({type: AUTH_SIGN, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};
const keepLoginAction = () => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const token = await AsyncStorage.getItem('token');
      const headers = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${url}/keep-login`, {}, headers);
      dispatch({type: AUTH_SIGN, payload: response.data});
      dispatch(getCartAction(response.data.id));
      dispatch(getAddressAction(response.data.id));
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};
const logoutAction = () => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    await AsyncStorage.removeItem('token');
    dispatch({type: AUTH_LOGOUT});
    dispatch({type: API_LOADING_SUCCESS});
  };
};

const closeErrorAction = () => {
  return {
    type: NULLIFY_ERROR,
  };
};

const getAddressAction = (userID) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const response = await axios.get(`${url}/address/${userID}`);
      dispatch({type: GET_ADDRESS, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_ERROR, payload: err.response.data.error});
    }
  };
};

const addNewAddressAction = (userID, payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      await axios.post(`${url}/address/${userID}`, payload);
      await dispatch(getAddressAction(userID));
      alert('success add new address');
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_ERROR, payload: err.response.data.error});
    }
  };
};
const changeAddressAction = (addressID, userID, payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      await axios.patch(`${url}/address/${addressID}`, payload);
      await dispatch(getAddressAction(userID));
      alert('success change address');
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_ERROR, payload: err.response.data.error});
    }
  };
};

const deleteAddressAction = (cartID, userID) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      await axios.delete(`${url}/address/${cartID}`);
      await dispatch(getAddressAction(userID));
      alert('success delete selected address');
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_ERROR, payload: err.response.data.error});
    }
  };
};

export {
  loginAction,
  registerAction,
  keepLoginAction,
  closeErrorAction,
  logoutAction,
  getAddressAction,
  addNewAddressAction,
  deleteAddressAction,
  changeAddressAction,
};
