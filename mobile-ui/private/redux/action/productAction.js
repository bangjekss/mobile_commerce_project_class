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

const getProducts = (search = '') => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const response = await axios.get(`${url}?name=${search}`);
      console.log(response.data);
      dispatch({type: GET_PRODUCTS, payload: response.data});
      dispatch({type: API_LOADING_SUCCESS});
    } catch (err) {
      console.log(err.response);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

const uploadProductAction = ({name, price, description, categoryID, photo}) => {
  return async (dispatch) => {
    dispatch({type: NULLIFY_ERROR});
    dispatch({type: API_LOADING_START});
    try {
      const headers = {
        headers: {
          'Content-Type': 'application/form-data',
        },
      };
      console.log(name, price, description, categoryID);
      console.log(photo);
      const formData = new FormData();
      const image = {
        uri: photo.path,
        type: 'image/jpeg',
        name: 'photo.jpeg',
      };
      formData.append('image', image);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('categoryID', categoryID);
      await axios.post(`${url}/image`, formData, headers);
      await dispatch(getProducts());
      dispatch({type: API_LOADING_SUCCESS});
      console.log('ea');
    } catch (err) {
      console.log(err);
      dispatch({type: API_LOADING_FAILED, payload: err.response.data.error});
    }
  };
};

export {getProducts, uploadProductAction};
