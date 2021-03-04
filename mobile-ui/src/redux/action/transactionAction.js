import axios from 'axios';
import {local} from '../../../local_ip';
import {
  API_LOADING_FAILED,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  GET_TRANSACTION,
  NULLIFY_ERROR,
} from '../type';

const url_transaction = `${local}/transaction`;
const url_cart = `${local}/cart`;

const checkoutAction = (payload) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const {userID} = payload;
      await axios.post(`${url_transaction}/${userID}`, payload);
      await axios.delete(`${url_cart}/clear/${userID}`);
      dispatch(getCartAction(userID));
      dispatch({type: API_LOADING_SUCCESS});
      alert('success');
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

const getTransactionAction = (userID) => {
  return async (dispatch) => {
    try {
      dispatch({type: NULLIFY_ERROR});
      dispatch({type: API_LOADING_START});
      const response = await axios.get(`${url_transaction}/${userID}`);
      dispatch({type: GET_TRANSACTION, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

export {checkoutAction, getTransactionAction};
