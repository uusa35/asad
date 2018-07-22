import {SET_ROLES} from '../actions/types';

export default function(roles = {}, action) {
  switch (action.type) {
    case SET_ROLES:
      return action.payload;
    default:
      return roles;
  }
}
