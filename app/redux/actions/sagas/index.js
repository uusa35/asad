import {fork} from 'redux-saga/effects';
import * as appSagas from './appSagas';
import * as langSagas from './langSagas';
import * as postSagas from './postSagas';
import {networkEventsListenerSaga} from 'react-native-offline';

export default function* rootSaga() {
  yield [
    fork(appSagas.appBootstrap),
    fork(langSagas.changeLang),
    fork(postSagas.submitRegisterRequest),
    fork(appSagas.enableSuccessMessage),
    fork(appSagas.enableErrorMessage),
    fork(appSagas.enableWarningMessage),
    fork(networkEventsListenerSaga, {
      timeout: 9000,
      checkConnectionInterval: 90000
    })
  ];
}
