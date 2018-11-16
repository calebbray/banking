import { combineReducers } from 'redux';
import errorReducer from './errorsReducer';
import userReducer from './userReducer';
import numbersReducer from './numbersReducer';

export default combineReducers({
  errors: errorReducer,
  authentication: userReducer,
  count: numbersReducer
});
