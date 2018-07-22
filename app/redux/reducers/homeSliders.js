import {SET_HOME_SLIDERS} from '../actions/types';

export default function(homeSliders = [], action) {
  switch (action.type) {
    case SET_HOME_SLIDERS:
      return action.payload;
    default:
      return homeSliders;
  }
}
