import * as actions from '../types';
import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import {defaultLang, setDirection} from './langSagas';
import * as api from '../api';
import * as helpers from '../../../helpers';
import validate from 'validate.js';
import {NavigationActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

export function* enableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: true});
}

export function* disableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: false});
}

export function* enableSuccessMessage() {
  yield takeLatest(actions.ENABLE_MESSAGE, startEnableSuccessMessage);
}

export function* enableErrorMessage() {
  yield* takeLatest(actions.ENABLE_MESSAGE, startEnableErrorMessage);
}

export function* enableWarningMessage() {
  yield takeLatest(actions.ENABLE_MESSAGE, startEnableWarningMessage);
}

export function* startEnableSuccessMessage(message) {
  yield* put({
    type: actions.ENABLE_MESSAGE,
    payload: {status: 'success', message, visible: true}
  });
}

export function* startEnableErrorMessage(message) {
  yield* put({
    type: actions.ENABLE_MESSAGE,
    payload: {status: 'error', message, visible: true}
  });
}

export function* startEnableWarningMessage(message) {
  yield* put({
    type: actions.ENABLE_MESSAGE,
    payload: {status: 'warning', message, visible: true}
  });
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
    let device_id = DeviceInfo.getUniqueID();
    yield all([
      call(enableLoading),
      call(defaultLang),
      put({type: actions.GET_DEVICE_ID, payload: device_id})
    ]);
    const api_token = yield call(helpers.getAuthToken);
    const registerRequest = yield call(api.getRegisterRequest, device_id);
    if (!validate.isEmpty(registerRequest)) {
      // add the registerRequest to the state according to the device id;
      yield put({type: actions.GET_REGISTER_REQUEST, payload: registerRequest});
    }
    console.log('the api_token', api_token);
    if (!validate.isEmpty(api_token)) {
      const user = yield call(api.getUser, api_token);
      if (!validate.isEmpty(user)) {
        yield all([
          put({type: actions.LOGIN, payload: user}),
          call(toggleGuest, false),
          put(
            NavigationActions.navigate({
              routeName: 'Home'
            })
          )
        ]);
      } else {
        yield call(toggleGuest, true);
      }
    }
    const sliders = yield call(api.getHomeSliders, 'is_splash');
    const settings = yield call(api.getSettings);
    const roles = yield call(api.getRoles);
    yield all([
      put({type: actions.GET_ROLES, payload: roles}),
      put({type: actions.GET_SETTINGS, payload: settings})
    ]);
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
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}
