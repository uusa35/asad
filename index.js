import './ReactotronConfig';
import React from 'react';
import { AppRegistry } from 'react-native';
import { Asad } from './app/Root';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => Asad );
