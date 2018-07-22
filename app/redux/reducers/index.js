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
  homeSliders
});

export default reducers;
