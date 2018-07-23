import {GET_DEVICE_ID} from '../actions/types';

export default function(deviceId = '', action) {
  switch (action.type) {
    case GET_DEVICE_ID:
      return action.payload;
    default:
      return deviceId;
  }
}
