import {SET_TOKEN, GET_TOKEN, REMOVE_TOKEN} from '../actions/types';

export default function(token = false, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.payload;
    case GET_TOKEN:
      return token;
    case REMOVE_TOKEN:
      return false;
    default:
      return token;
  }
}
