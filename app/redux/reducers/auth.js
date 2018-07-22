import {LOGIN, LOGOUT} from '../actions/types';

export default function(auth = {}, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return auth;
  }
}
