import {
  INCREMENT_COUNT,
  INCREASE_INCREMENT,
  DECREASE_INCREMENT
} from '../actions/types';

const initialState = {
  count: 0,
  increment: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + state.increment
      };
    case INCREASE_INCREMENT:
      return {
        ...state,
        increment: state.increment + 1
      };
    case DECREASE_INCREMENT:
      return {
        ...state,
        increment: state.increment - 1
      };
    default:
      return state;
  }
};
