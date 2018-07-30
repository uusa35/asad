import {SET_PROJECTS} from '../actions/types';

export default function(projects = [], action) {
  switch (action.type) {
    case SET_PROJECTS:
      return action.payload;
    default:
      return projects;
  }
}
