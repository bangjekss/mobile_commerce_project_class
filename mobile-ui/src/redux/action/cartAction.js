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

const addToCartAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const {userID} = payload;
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

export {addToCartAction, getCartAction};
