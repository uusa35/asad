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
  getSearchingProjects
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
  console.log('action', action.payload);
  try {
    const state = yield select();
    const text = action.payload;
    const api_token = state.token;
    const search = yield call(getSearchingProjects, {
      text,
      api_token
    });
    console.log('the search result', search);
    if (!validate.isEmpty(search) && validate.isArray(search)) {
      console.log('if statement');
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
