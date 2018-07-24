import {fork} from 'redux-saga/effects';
import * as appSagas from './appSagas';
import * as LangSagas from './LangSagas';
import {networkEventsListenerSaga} from 'react-native-offline';

export default function* rootSaga() {
  yield [
    fork(appSagas.appBootstrap),
    // fork(LangSagas.changeLang),
    fork(networkEventsListenerSaga, {
      timeout: 9000,
      checkConnectionInterval: 90000
    })
  ];
}
