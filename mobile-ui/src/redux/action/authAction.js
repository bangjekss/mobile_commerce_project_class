import axios from 'axios';
import {
  API_LOADING_FAILED,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  AUTH_SIGN,
  NULLIFY_ERROR,
} from '../type';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log(token);
      await AsyncStorage.setItem('token', token);
      dispatch({type: AUTH_SIGN, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);

      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
      // alert(err.response.data.error);
    }
  };
};
const registerAction = (payload) => {};
const keepLoginAction = (payload) => {};

const closeErrorAction = () => {
  return {
    type: NULLIFY_ERROR,
  };
};

export {loginAction, registerAction, keepLoginAction, closeErrorAction};
