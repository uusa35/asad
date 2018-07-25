import {LOGIN, LOGOUT, SUBMIT_LOGIN} from '../actions/types';

export default function(auth = {}, action) {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return action.payload;
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return auth;
  }
}
