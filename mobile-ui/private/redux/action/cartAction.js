import axios from 'axios';
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
      dispatch({type: ADD_TO_CART, payload});
      dispatch({type: API_LOADING_SUCCESS});
      alert('Succesfully add to your cart');
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
      dispatch(getCartAction(userID));
      dispatch({type: API_LOADING_SUCCESS});
      // alert('qty changed');
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
const checkoutAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const {userID} = payload;
      await axios.post(`${url_transaction}/${userID}`, payload);
      await axios.delete(`${url}/clear/${userID}`);
      dispatch(getCartAction(userID));
      dispatch({type: API_LOADING_SUCCESS});
      alert('success');
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
  checkoutAction,
};
