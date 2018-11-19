/**
 * Created by usamaahmed on 9/17/17.
 */
import Reactotron from 'reactotron-react-native';
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootSaga from './actions/sagas';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {navMiddleware} from './../AppNavigator';

let Store;

if (__DEV__) {
  // create our new saga monitor
  const sagaMonitor = Reactotron.createSagaMonitor;
  // and in your call to createSagaMiddlware, pass it along inside
  // the 1st parameter's object.
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  const appLogger = createLogger({
    collapsed: true,
    duration: true
  });
  Store = createStore(
    reducers,
    applyMiddleware(appLogger, sagaMiddleware, navMiddleware)
  );
  // run the saga --> go to actions then calling the saga related function
  sagaMiddleware.run(rootSaga);
} else {
  const sagaMiddleware = createSagaMiddleware();
  Store = createStore(reducers, applyMiddleware(sagaMiddleware, navMiddleware));
  // run the saga --> go to actions then calling the saga related function
  sagaMiddleware.run(rootSaga);
}

export default Store;
