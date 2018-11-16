import axios from 'axios';
import {
  INCREMENT_COUNT,
  INCREASE_INCREMENT,
  DECREASE_INCREMENT
} from './types';

export const testCustomers = () => {
  axios
    .get('/api/customers/test')
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));

  axios
    .get('/api/users/test')
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};

export const count = () => dispatch => {
  dispatch({
    type: INCREMENT_COUNT
  });
};

export const increment = () => dispatch => {
  dispatch({
    type: INCREASE_INCREMENT
  });
};

export const decrement = () => dispatch => {
  dispatch({
    type: DECREASE_INCREMENT
  });
};
