import Reactotron , { trackGlobalErrors } from 'reactotron-react-native';
import sagaPlugin from 'reactotron-redux-saga';
import { displayName } from './app.json';

Reactotron
    .configure({
        name: displayName
    })
    .useReactNative()
    .use(trackGlobalErrors()) // <-- sweet
    .use(sagaPlugin()) // <-- sweet
    .connect();