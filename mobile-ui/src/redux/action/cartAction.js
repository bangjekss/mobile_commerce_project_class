import axios from 'axios';
import {Alert} from 'react-native';
import {local} from '../../../local_ip';
import {
  ADD_TO_CART,
  API_LOADING_FAILED,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  GET_CART,
  NULLIFY_ERROR,
} from '../type';

const url = `${local}/cart`;
const url_transaction = `${local}/transaction`;

const addToCartAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const {userID} = payload;
      console.log(payload);
      await axios.post(`${url}/${userID}`, payload);
      await dispatch(getCartAction(userID));
      dispatch({type: API_LOADING_SUCCESS});
      Alert.alert('Succesfully add to your cart');
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
      alert(err.response.data.error);
    }
  };
};

const getCartAction = (userID) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const response = await axios.get(`${url}/${userID}`);
      dispatch({type: GET_CART, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

const changeQtyCartAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const {quantity, id, userID} = payload;
      await axios.patch(`${url}/${id}`, {quantity});
      await dispatch(getCartAction(userID));
      dispatch({type: API_LOADING_SUCCESS});
      Alert.alert('qty changed');
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

const deleteCartAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const {id, userID} = payload;
      await axios.delete(`${url}/${id}`);
      dispatch(getCartAction(userID));
      dispatch({type: API_LOADING_SUCCESS});
      alert('product deleted from cart');
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

const changeIsCheckedCartAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      await axios.patch(`${url}/change-checked/${payload.id}`, payload);
      await dispatch(getCartAction(payload.userID));
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

export {
  addToCartAction,
  getCartAction,
  changeQtyCartAction,
  deleteCartAction,
  changeIsCheckedCartAction,
};
