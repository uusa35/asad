import {combineReducers} from 'redux';
import navReducer from './navReducer';
import {reducer as network} from 'react-native-offline';
import isLoading from './isLoading';
import token from './token';
import guest from './guest';
import bootStrapped from './bootStrapped';
import settings from './settings';
import roles from './roles';
import role from './role';
import lang from './lang';
import auth from './auth';
import message from './message';
import homeSliders from './homeSliders';
import deviceId from './deviceId';
import playerId from './playerId';
import registerRequest from './registerRequest';
import projects from './projects';
import categories from './categories';
import project from './project';
import galleries from './galleries';
import search from './search';
import notification from './notification';

let reducers = combineReducers({
  nav: navReducer,
  network,
  isLoading,
  message,
  token,
  lang,
  auth,
  guest,
  bootStrapped,
  settings,
  roles,
  role,
  homeSliders,
  deviceId,
  playerId,
  registerRequest,
  projects,
  categories,
  search,
  project,
  galleries,
  notification
});

export default reducers;
