import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import * as actions from '../types';
import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import I18n, {isRTL} from './../../../I18n';
import validate from 'validate.js/validate';
import {enableErrorMessage, disableLoading} from './appSagas';
import * as helpers from './../../../helpers';

export function* setDirection(defaultLang) {
  try {
    if (defaultLang === 'ar') {
      console.log('set drection arabic case');
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    } else {
      console.log('set directione nglish case');
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
    console.log('action', action);
    console.log('lang from start change', lang);
    yield call(helpers.setLang, lang);
    yield call(setDirection, lang);
    yield put({type: actions.SET_LANG, payload: lang});
    I18n.locale = lang;
    yield delay(1000);
    yield call(RNRestart.Restart());
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
  console.log('the lang from default lang', lang);
  console.log('isRTL', isRTL);
  yield put({type: actions.SET_LANG, payload: lang});
}
