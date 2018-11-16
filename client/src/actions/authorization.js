import axios from 'axios';

export const login = credentials => dispatch => {
  axios
    .post('/api/users/login', credentials)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => console.log(err));
};
