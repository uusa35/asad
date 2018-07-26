import React from 'react';
import {Platform, Dimensions} from 'react-native';
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
    icon: 'exclamation-triangle',
    color: '#fac811'
  },
  auth: {},
  token: false,
  guest: true,
  currentPage: 1,
  lang: 'en',
  settings: {},
  projects: [],
  categories: [],
  category: {},
  roles: [],
  role: {},
  homeSliders: [],
  requesterRequest: {},
  deviceId: ''
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
  logo: require('./../assets/images/logo.png'),
  bg: require('./../assets/images/bg.png')
};

export const icons = {
  btnBt: require('./../assets/icons/btnBg.png'),
  client: require('./../assets/icons/client.png'),
  consultant: require('./../assets/icons/consultant.png'),
  user: require('./../assets/icons/user.png'),
  guest: require('./../assets/icons/guest.png'),
  vendor: require('./../assets/icons/vendor.png'),
  supplier: require('./../assets/icons/supplier.png'),
  subcontractor: require('./../assets/icons/subcontractor.png'),
  company: require('./../assets/icons/company.png'),
  attachment: require('./../assets/icons/attachment.png'),
  address: require('./../assets/icons/address.png'),
  password: require('./../assets/icons/password.png')
};

export const colors = {
  main: '#fac811'
};

export const text = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 25,
  font: 'cairo'
};
