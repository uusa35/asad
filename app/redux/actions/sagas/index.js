import {fork} from 'redux-saga/effects';
import * as appSagas from './appSagas';
import * as langSagas from './langSagas';
import * as requestSagas from './requestSagas';
import {networkEventsListenerSaga} from 'react-native-offline';

export default function* rootSaga() {
  yield [
    fork(appSagas.appBootstrap),
    fork(langSagas.changeLang),
    fork(requestSagas.submitRegisterRequest),
    fork(requestSagas.submitLogin),
    fork(appSagas.logout),
    fork(requestSagas.getProject),
    fork(networkEventsListenerSaga, {
      timeout: 9000,
      checkConnectionInterval: 90000
    })
  ];
}
