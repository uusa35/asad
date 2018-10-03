import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import * as actions from '../types';
import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import I18n from './../../../I18n';
import validate from 'validate.js/validate';
import {enableErrorMessage, disableLoading} from './appSagas';
import * as helpers from './../../../helpers';

export function* setDirection(defaultLang) {
  try {
    if (defaultLang === 'ar') {
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

export function* startChangeLang(action) {
  try {
    const lang = action.payload;
    yield call(helpers.setLang, lang);
    yield call(setDirection, lang);
    yield put({type: actions.SET_LANG, payload: lang});
    I18n.locale = lang;
    yield delay(1000);
    yield call(RNRestart.Restart);
  } catch (e) {
    yield call(enableErrorMessage, e.message);
  }
}
export function* changeLang() {
  yield takeLatest(actions.CHANGE_LANG, startChangeLang);
}

export function* defaultLang() {
  const defaultLang = yield call(helpers.getLang);
  const lang = !validate.isEmpty(defaultLang)
    ? defaultLang
    : I18n.defaultLocale;
  yield call(helpers.setLang, lang);
  yield call(setDirection, lang);
  I18n.locale = lang;
  yield put({type: actions.SET_LANG, payload: lang});
}
