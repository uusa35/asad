import * as actions from './types';
import I18n from './../../I18n';
import {colors} from './../../constants';

export function appBootstrap() {
  return {
    type: actions.START_BOOTSTRAP
  };
}

export function toggleBootstrapped(bootstrapped) {
  return {
    type: actions.TOGGLE_BOOTSTRAPPED,
    payload: bootstrapped
  };
}

export function toggleLoading(isLoading) {
  return {
    type: actions.TOGGLE_LOADING,
    payload: isLoading
  };
}

export function logout() {
  return {
    type: actions.LOGOUT
  };
}

export function login(user) {
  return {
    type: actions.LOGIN,
    payload: user
  };
}

export function enableMessage(status, content, title = I18n.t('asad')) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      status,
      content,
      title,
      visible: true,
      color: colors.main
    }
  };
}

export function enableSuccessMessage(content) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      type: 'success',
      content,
      title: I18n.t('asad'),
      visible: true,
      color: 'green'
    }
  };
}

export function enableErrorMessage(content) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      type: 'error',
      content,
      title: I18n.t('asad'),
      visible: true,
      color: 'red'
    }
  };
}

export function enableWarningMessage(content) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      type: 'warning',
      content,
      title: I18n.t('asad'),
      visible: true,
      color: 'orange'
    }
  };
}

export function disableMessage() {
  return {
    type: actions.DISABLE_MESSAGE
  };
}
export function changeLang(lang) {
  return {
    type: actions.CHANGE_LANG,
    payload: lang
  };
}

export function setLang(lang) {
  return {
    type: actions.SET_LANG,
    payload: lang
  };
}
export function toggleGuest(guest) {
  return {
    type: actions.TOGGLE_GUEST,
    payload: guest
  };
}

export function setHomeSliders(sliders) {
  return {
    type: actions.SET_HOME_SLIDERS,
    payload: sliders
  };
}

export function getRoles(roles) {
  return {
    type: actions.GET_ROLES,
    payload: roles
  };
}

export function getSettings(settings) {
  return {
    type: actions.GET_SETTINGS,
    payload: settings
  };
}

export function submitRegisterRequest(payload) {
  return {
    type: actions.SUBMIT_REGISTER_REQUEST,
    payload
  };
}

export function submitLogin(username, password) {
  return {
    type: actions.SUBMIT_LOGIN,
    paylaod: {
      username,
      password
    }
  };
}

export const APP_ACTIONS = {
  appBootstrap,
  toggleBootstrapped,
  toggleLoading,
  toggleGuest,
  changeLang,
  setLang,
  enableMessage,
  disableMessage,
  enableSuccessMessage,
  enableErrorMessage,
  enableWarningMessage,
  getRoles,
  getSettings,
  logout,
  login,
  setHomeSliders,
  submitRegisterRequest,
  submitLogin
};
