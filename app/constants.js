import React from 'react';
import {Platform, Dimensions} from 'react-native';
import I18n from './I18n';
import {appUrlIos, appUrlAndroid} from './env';

export const {height, width} = Dimensions.get('window');
export const isIOS = Platform.OS === 'ios' ? true : false;

export const initialState = {
  isLoading: false,
  network: {},
  bootStrapped: false,
  message: {
    visible: false,
    title: '',
    content: '',
    status: 'info'
  },
  auth: {},
  token: false,
  guest: false,
  currentPage: 1,
  lang: I18n.locale,
  settings: {},
  projects: [],
  categories: [],
  category: {},
  roles: [],
  role: {},
  homeSliders: []
};

export const links = {
  apiUrl: isIOS ? appUrlIos + 'api/' : appUrlAndroid + 'api/',
  storageUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/'
    : appUrlAndroid + 'storage/uploads/images/',
  thumbnailUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/thumbnail/'
    : appUrlAndroid + 'storage/uploads/images/thumbnail/',
  thumbnailUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/thumbnail/'
    : appUrlAndroid + 'storage/uploads/images/thumbnail/',
  mediumUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/medium/'
    : appUrlAndroid + 'storage/uploads/images/medium/',
  largeUrl: isIOS
    ? appUrlIos + 'storage/uploads/images/large/'
    : appUrlAndroid + 'storage/uploads/images/large/',
  googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=',
  facebook: 'http://facebook.com/',
  twitter: 'http://twitter.com/',
  instagram: 'http//instagram.com/',
  snapchat: 'http://snapchat.com/'
};

export const images = {
  login: require('./../assets/images/login.png'),
  logo: require('./../assets/images/logo.png'),
  tagIcon: require('./../assets/icons/tag.png')
};
