import {
  REGISTER_REQUEST,
  SUBMIT_REGISTER_REQUEST,
  GET_REGISTER_REQUEST
} from '../actions/types';

export default function(registerRequest = {}, action) {
  switch (action.type) {
    case SUBMIT_REGISTER_REQUEST:
      return action.payload;
    case GET_REGISTER_REQUEST:
      return action.payload;
    default:
      return registerRequest;
  }
}
