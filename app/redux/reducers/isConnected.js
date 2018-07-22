import {TOGGLE_CONNECTED} from '../actions/types';

export default function(isConnected = false, action) {
  switch (action.type) {
    case TOGGLE_CONNECTED:
      return action.payload;
    default:
      return isConnected;
  }
}
