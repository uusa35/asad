import * as actions from '../types';
import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import {defaultLang, setDirection} from './LangSagas';
import * as api from '../api';
import * as helpers from '../../../helpers';
import validate from 'validate.js';

export function* enableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: true});
}

export function* disableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: false});
}

export function* enableMessage(status, message) {
  yield put({type: actions.ENABLE_MESSAGE, payload: {status, message}});
}

export function* enableSuccessMessage(message) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {status: 'success', message}
  });
}

export function* enableErrorMessage(message) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {status: 'error', message}
  });
}

export function* enableInfoMessage(message) {
  yield put({type: actions.ENABLE_MESSAGE, payload: {status: 'info', message}});
}

export function* appBootstrap() {
  yield takeLatest(actions.START_BOOTSTRAP, startAppBootStrap);
}

export function* toggleBootStrapped(bootStrapped) {
  yield put({type: actions.TOGGLE_BOOTSTRAPPED, payload: bootStrapped});
}

export function* toggleGuest(guest) {
  yield put({type: actions.TOGGLE_GUEST, payload: guest});
}

export function* startAppBootStrap() {
  try {
    yield all([call(enableLoading), call(defaultLang)]);
    const api_token = yield call(helpers.getAuthToken);
    console.log('the api_token', api_token);
    if (!validate.isEmpty(api_token)) {
      const user = yield call(api.getUser, api_token);
      if (!validate.isEmpty(user)) {
        yield all([
          put({type: actions.LOGIN, payload: user}),
          call(toggleGuest, false)
        ]);
      } else {
        yield call(toggleGuest, true);
      }
    }
    const sliders = yield call(api.getHomeSliders, 'is_splash');
    if (!validate.isEmpty(sliders)) {
      yield all([
        put({type: actions.SET_HOME_SLIDERS, payload: sliders}),
        call(toggleBootStrapped, true),
        call(disableLoading)
      ]);
    } else {
      throw new Error(sliders.message);
    }
  } catch (e) {
    yield all([disableLoading, enableMessage('error', e.message)]);
  }
}
