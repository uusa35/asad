import * as actions from '../types';
import {delay} from 'redux-saga';
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
  enableSuccessMessage,
  enableLoading,
  startLoginScenario
} from './appSagas';
import {
  postRegisterRequest,
  authenticate,
  getProjectById,
  getSearchingProjects,
  forgetPassword
} from './../api';
import {NavigationActions} from 'react-navigation';
import I18n from './../../../I18n';

export function* submitRegisterRequest() {
  yield takeLatest(actions.SUBMIT_REGISTER_REQUEST, startSubmitRegisterRequest);
}

export function* startSubmitRegisterRequest(action) {
  try {
    const registerRequest = yield call(postRegisterRequest, action.payload);
    if (!validate.isEmpty(registerRequest)) {
      yield put({type: actions.GET_REGISTER_REQUEST, payload: registerRequest});
      yield call(enableSuccessMessage, I18n.t('register_request_stored'));
      yield delay(1000);
      yield put(NavigationActions.navigate({routeName: 'Home'}));
    } else {
      throw new Error(registerRequest);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* submitLogin() {
  yield takeLatest(actions.SUBMIT_LOGIN, startSubmitLogin);
}

export function* startSubmitLogin(action) {
  try {
    console.log('new state for login', action.payload);
    const user = yield call(authenticate, action.payload);
    if (!validate.isEmpty(user) && !validate.isEmpty(user.api_token)) {
      yield all([
        call(enableLoading),
        call(startLoginScenario, user),
        call(enableSuccessMessage, I18n.t('login_success')),
        delay(1000),
        put(
          NavigationActions.navigate({
            routeName: 'Home'
          })
        ),
        call(disableLoading)
      ]);
    } else {
      throw new Error(user);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* getSearch() {
  yield takeLatest(actions.GET_SEARCH, startGetSearchScenario);
}

export function* startGetSearchScenario(action) {
  try {
    const state = yield select();
    const text = action.payload;
    const api_token = state.token;
    const search = yield call(getSearchingProjects, {
      text,
      api_token
    });
    if (!validate.isEmpty(search) && validate.isArray(search)) {
      yield all([
        call(enableSuccessMessage, I18n.t('search_success')),
        put({type: actions.SET_SEARCH, payload: search}),
        put(
          NavigationActions.navigate({
            routeName: 'SearchIndex',
            params: {projects: search}
          })
        )
      ]);
    } else {
      yield put({type: actions.SET_SEARCH, payload: []});
      throw new Error(search);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* getProject() {
  yield takeLatest(actions.GET_PROJECT, startGetProjectScenario);
}

export function* startGetProjectScenario(action) {
  try {
    const state = yield select();
    const {token} = state;
    const project = yield call(getProjectById, {
      id: action.payload.id,
      api_token: token
    });
    if (!validate.isEmpty(project)) {
      yield all([
        put({type: actions.SET_PROJECT, payload: project}),
        put(
          NavigationActions.navigate({
            routeName: 'ProjectShow',
            params: {name: project.name, project: project}
          })
        )
      ]);
    } else {
      throw new Error(project);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}

export function* submitForgetPassword() {
  yield takeLatest(actions.SUBMIT_FORGET_PASSWORD, startSubmitForgetPassword);
}

export function* startSubmitForgetPassword(action) {
  try {
    const user = yield call(forgetPassword, action.payload);
    console.log('the user', user);
    if (!validate.isEmpty(user) && !validate.isEmpty(user.api_token)) {
      yield all([
        call(
          enableSuccessMessage,
          I18n.t('forget_password_success_email_is_sent')
        ),
        delay(1000),
        put(
          NavigationActions.navigate({
            routeName: 'Home'
          })
        )
      ]);
    } else {
      throw new Error(user);
    }
  } catch (e) {
    yield all([call(disableLoading), call(enableErrorMessage, e.message)]);
  }
}
