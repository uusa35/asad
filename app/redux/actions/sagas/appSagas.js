import * as actions from '../types';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import {defaultLang, startChangeLang} from './langSagas';
import * as api from '../api';
import * as helpers from '../../../helpers';
import validate from 'validate.js';
import {NavigationActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import I18n from './../../../I18n';

export function* enableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: true});
}

export function* disableLoading() {
  yield put({type: actions.TOGGLE_LOADING, payload: false});
}

export function* enableSuccessMessage(content, title = I18n.t('asad')) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {
      content,
      title,
      icon: 'exclamation-triangle',
      color: 'green',
      visible: true
    }
  });
}

export function* enableErrorMessage(content, title = I18n.t('asad')) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {
      content,
      title,
      icon: 'exclamation-triangle',
      visible: true,
      color: 'red'
    }
  });
}

export function* enableWarningMessage(content, title = I18n.t('asad')) {
  yield put({
    type: actions.ENABLE_MESSAGE,
    payload: {
      content,
      title,
      icon: 'exclamation-triangle',
      visible: true,
      color: 'orange'
    }
  });
}

export function* logout() {
  yield takeLatest(actions.LOGOUT, startLogoutScenario);
}

export function* startLogoutScenario() {
  yield all([
    put({type: actions.LOGIN, payload: {}}),
    put({type: actions.SET_TOKEN, payload: ''}),
    call(helpers.setAuthToken, ''),
    put({type: actions.TOGGLE_GUEST, payload: true}),
    put({type: actions.SET_PROJECTS, payload: []})
  ]);
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

export function* startLoginScenario(user) {
  yield all([
    put({type: actions.LOGIN, payload: user}),
    put({type: actions.SET_TOKEN, payload: user.api_token}),
    call(helpers.setAuthToken, user.api_token),
    put({type: actions.TOGGLE_GUEST, payload: false})
  ]);
  if (!validate.isEmpty(user.projects)) {
    yield put({type: actions.SET_PROJECTS, payload: user.projects});
  }
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
    const galleries = yield call(api.getGalleries, {
      type: 'user',
      element_id: 1
    });
    if (!validate.isEmpty(galleries)) {
      yield put({type: actions.SET_GALLERIES, payload: galleries});
    }
    if (!validate.isEmpty(registerRequest)) {
      // add the registerRequest to the state according to the device id;
      yield put({type: actions.GET_REGISTER_REQUEST, payload: registerRequest});
    }
    if (!validate.isEmpty(api_token)) {
      const user = yield call(api.authenticated, api_token);
      if (
        !validate.isEmpty(user) &&
        validate.isObject(user) &&
        !validate.isEmpty(api_token)
      ) {
        yield all([
          call(startLoginScenario, user),
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
    if (!validate.isEmpty(settings) && !validate.isEmpty(roles)) {
      yield all([
        put({type: actions.GET_ROLES, payload: roles}),
        put({type: actions.GET_SETTINGS, payload: settings})
      ]);
    } else {
      throw new Error('settings error or roles .. system error');
    }

    if (!validate.isEmpty(sliders)) {
      yield all([
        put({type: actions.SET_HOME_SLIDERS, payload: sliders}),
        call(toggleBootStrapped, true),
        call(disableLoading)
      ]);
    } else {
      yield all([
        call(toggleBootStrapped, true),
        call(disableLoading),
        put(
          NavigationActions.navigate({
            routeName: 'Home'
          })
        )
      ]);
    }
  } catch (e) {
    console.log('the e from appSaga', e);
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* startLinkNotificationScenario(action) {
  const {type, path, title} = action.payload;
  if (type == 'pdf') {
    yield put(
      NavigationActions.navigate({
        routeName: 'AppPDFViewer',
        params: {pdfLink: path, title}
      })
    );
  }
}

export function* linkNotification() {
  yield takeLatest(actions.LINK_NOTIFICATION, startLinkNotificationScenario);
}
