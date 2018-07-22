import React from 'react';
import {Provider} from 'react-redux';
import Store from './redux/store';
import App from './App';

export const Asad = () => (
  <Provider store={Store}>
    <App />
  </Provider>
);
