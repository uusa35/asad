import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import { Asad } from './app/Root';
import {name as appName} from './app.json';

console.disableYellowBox = true;
StatusBar.setBarStyle("dark-content");
AppRegistry.registerComponent(appName, () => Asad );
