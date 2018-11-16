import { LOGIN_USER } from '../actions/types';
import { isEmpty } from '../../../utils/helpers';

const initialState = {
  authenticated: false,
  user: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        authenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};
