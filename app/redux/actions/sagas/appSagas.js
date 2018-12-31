import {BackHandler, Alert} from 'react-native';
import * as actions from '../types';
import {takeLatest, call, put, all} from 'redux-saga/effects';
import {defaultLang} from './langSagas';
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
    put({type: actions.LOGIN, payload: user}), // store the auth into state
    put({type: actions.SET_TOKEN, payload: user.api_token}), // store the token into state
    call(helpers.setAuthToken, user.api_token), // store the token into storage
    put({type: actions.TOGGLE_GUEST, payload: false}) // set the guest to false
  ]);
  if (!validate.isEmpty(user)) {
    const projects = yield call(api.getProjects, user.api_token);
    if (!validate.isEmpty(projects)) {
      yield put({type: actions.SET_PROJECTS, payload: projects}); // store list of projects into state
    }
  }
}

export function* startAppBootStrap() {
  try {
    let device_id = DeviceInfo.getUniqueID(); // get the deviceID
    __DEV__ ? console.log('device_id', device_id) : null;
    yield all([
      call(enableLoading),
      call(defaultLang), // set app default lang
      put({type: actions.GET_DEVICE_ID, payload: device_id}) // store deviceId into state
    ]);
    const api_token = yield call(helpers.getAuthToken); // get the token from storage
    const registerRequest = yield call(api.getRegisterRequest, device_id);
    const galleries = yield call(api.getGalleries, {
      type: 'user',
      element_id: 1
    }); // get app galleries (all galleries created by admin)
    if (!validate.isEmpty(galleries)) {
      yield put({type: actions.SET_GALLERIES, payload: galleries}); // store galleries into state
    }
    if (!validate.isEmpty(registerRequest)) {
      // add the registerRequest to the state according to the device id;
      yield put({type: actions.GET_REGISTER_REQUEST, payload: registerRequest}); // store registerRequest into state (to not allow user to request again)
    }
    if (!validate.isEmpty(api_token)) {
      const user = yield call(api.authenticated, api_token); // get the auth user according to auth stored in storage
      if (
        !validate.isEmpty(user) &&
        validate.isObject(user) &&
        !validate.isEmpty(api_token)
      ) {
        yield all([
          call(startLoginScenario, user),
          call(toggleGuest, false),
          put({type: actions.GET_DEVICE_ID, payload: user.device_id}), // store deviceId into state
          put(
            NavigationActions.navigate({
              routeName: 'Home'
            })
          )
        ]); // if user authenticated navigate to Home with list of projects.
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

export function* goBackBtnScenario(action) {
  if (!action.payload) {
    yield put(NavigationActions.back());
  } else {
    Alert.alert(I18n.t('do_you_want_to_exit_the_app'), '', [
      {
        text: I18n.t('confirm'),
        onPress: () => BackHandler.exitApp()
      },
      {
        text: I18n.t('cancel'),
        onPress: () => false
      }
    ]);
  }
}

export function* goBackBtn() {
  yield takeLatest(actions.GO_BACK, goBackBtnScenario);
}

export function* startGetPlayerId(action) {
  put({type: actions.SET_PLAYER_ID, payload: action.payload});
}
export function* getPlayerId() {
  yield takeLatest(actions.GET_PLAYER_ID, startGetPlayerId);
}
