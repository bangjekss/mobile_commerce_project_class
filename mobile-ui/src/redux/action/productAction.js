import axios from 'axios';
import {local} from '../../../local_ip';
import {
  API_LOADING_FAILED,
  API_LOADING_START,
  API_LOADING_SUCCESS,
  GET_PRODUCTS,
  NULLIFY_ERROR,
} from '../type';

const url = `${local}/product`;

const getProducts = () => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const response = await axios.get(`${url}`);
      dispatch({type: GET_PRODUCTS, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

export {getProducts};
