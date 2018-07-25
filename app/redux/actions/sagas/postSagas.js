import * as actions from '../types';
import {takeLatest, call, put, all, select} from 'redux-saga/effects';
import validate from 'validate.js/validate';
import {
  enableErrorMessage,
  disableLoading,
  enableLoading,
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
    yield call(enableLoading);
    const registerRequest = yield call(postRegisterRequest, action.payload);
    if (!validate.isEmpty(registerRequest)) {
      yield put({type: actions.GET_REGISTER_REQUEST, payload: registerRequest});
      yield put(NavigationActions.navigate({routeName: 'Home'}));
      yield enableSuccessMessage(I18n.t('register_request_stored'));
    } else {
      throw new Error(registerRequest);
    }
  } catch (e) {
    yield all([disableLoading, enableErrorMessage(e.message)]);
  }
}
