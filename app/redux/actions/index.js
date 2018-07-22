import * as actions from './types';
import I18n from './../../I18n';

export function appBootstrap() {
  return {
    type: actions.START_BOOTSTRAP
  };
}

function toggleBootstrapped(bootstrapped) {
  return {
    type: actions.TOGGLE_BOOTSTRAPPED,
    payload: bootstrapped
  };
}

function toggleLoading(isLoading) {
  return {
    type: actions.TOGGLE_LOADING,
    payload: isLoading
  };
}

function logout() {
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

function enableMessage(type, message, title = I18n.t('asad')) {
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

function disableMessage() {
  return {
    type: actions.DISABLE_MESSAGE
  };
}
function changeLang(lang) {
  return {
    type: actions.CHANGE_LANG,
    payload: lang
  };
}

function toggleGuest(guest) {
  return {
    type: actions.TOGGLE_GUEST,
    payload: guest
  };
}

function setHomeSliders(sliders) {
  return {
    type: actions.SET_HOME_SLIDERS,
    payload: sliders
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
  logout,
  login,
  setHomeSliders
};
