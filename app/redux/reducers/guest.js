import {TOGGLE_GUEST} from '../actions/types';

export default function(guest = false, action) {
  switch (action.type) {
    case TOGGLE_GUEST:
      return action.payload;
    default:
      return guest;
  }
}
