/**
 * Created by usamaahmed on 9/17/17.
 */
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import rootSaga from './actions/sagas';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import {navMiddleware} from './../AppNavigator';

const sagaMiddleware = createSagaMiddleware();
let Store;

if (__DEV__) {
  const appLogger = createLogger({
    collapsed: true,
    duration: true
  });
  Store = createStore(
    reducers,
    applyMiddleware(appLogger, sagaMiddleware, navMiddleware)
  );
} else {
  Store = createStore(reducers, applyMiddleware(sagaMiddleware, navMiddleware));
}

// run the saga --> go to actions then calling the saga related function
sagaMiddleware.run(rootSaga);

export default Store;
