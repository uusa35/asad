import * as actions from './types';
import I18n from './../../I18n';

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

export function enableMessage(type, message, title = I18n.t('asad')) {
  return {
    type: actions.ENABLE_MESSAGE,
    payload: {
      type,
      message,
      title,
      visible: true
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

export const APP_ACTIONS = {
  appBootstrap,
  toggleBootstrapped,
  toggleLoading,
  toggleGuest,
  changeLang,
  enableMessage,
  disableMessage,
  getRoles,
  getSettings,
  logout,
  login,
  setHomeSliders
};
