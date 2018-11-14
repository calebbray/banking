import axios from 'axios';

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
