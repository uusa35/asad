import * as actions from '../types';
import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  select
} from 'redux-saga/effects';
import validate from 'validate.js/validate';
import {
  enableErrorMessage,
  disableLoading,
  enableSuccessMessage
} from './appSagas';
import {postRegisterRequest} from './../api';
import {NavigationActions} from 'react-navigation';
import I18n from './../../../I18n';

export function* submitRegisterRequest() {
  yield takeLatest(actions.SUBMIT_REGISTER_REQUEST, startSubmitRegisterRequest);
}

export function* startSubmitRegisterRequest(action) {
  try {
    const registerRequest = yield call(postRegisterRequest, action.payload);
    if (!validate.isEmpty(registerRequest)) {
      console.log('from inside true if');
      yield put({type: actions.GET_REGISTER_REQUEST, payload: registerRequest});
      yield call(enableSuccessMessage, I18n.t('register_request_stored'));
      yield delay(1000);
      yield put(NavigationActions.navigate({routeName: 'Home'}));
    } else {
      throw new Error(registerRequest);
    }
  } catch (e) {
    console.log('the e', e);
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}
