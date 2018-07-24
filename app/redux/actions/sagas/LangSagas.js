import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import * as actions from '../types';
import {takeLatest, fork, call, put, all, select} from 'redux-saga/effects';
import I18n from 'react-native-i18n';
import validate from 'validate.js/validate';
import {enableErrorMessage, disableLoading} from './appSagas';
import * as helpers from './../../../helpers';

export function* setDirection(defaultLang) {
  try {
    if (defaultLang == 'ar') {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* changeLang(lang) {
  try {
    yield all([
      call(helpers.setLang, lang),
      put({type: actions.CHANGE_LANG, payload: lang}),
      call(setDirection, lang)
    ]);
    I18n.locale = lang;
    yield call(RNRestart.Restart);
  } catch (e) {
    yield call(enableErrorMessage, e.message);
  }
}

export function* defaultLang() {
  const defaultLang = yield call(helpers.getLang);
  if (!validate.isEmpty(defaultLang)) {
    console.log('empty case');
    I18n.locale = defaultLang;
    yield put({type: actions.CHANGE_LANG, payload: defaultLang});
    yield call(setDirection, defaultLang);
  } else {
    let defaultLang = I18n.defaultLocale;
    yield put({type: actions.CHANGE_LANG, payload: defaultLang});
    yield call(setDirection, defaultLang);
  }
}
