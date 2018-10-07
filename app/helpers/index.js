/**
 * Created by usamaahmed on 9/25/17.
 */
import React from 'react';
import {AsyncStorage, Alert, Platform, Text} from 'react-native';
import _ from 'lodash';
import I18n from './../I18n';
import {width, isIOS} from './../constants';
import geolib, {getDistance} from 'geolib';
import validate from 'validate.js';

export async function setAuthToken(token) {
  return AsyncStorage.setItem('@asad:api_token', token);
}

export async function getAuthToken() {
  return AsyncStorage.getItem('@asad:api_token');
}

export function setLang(lang) {
  return AsyncStorage.setItem('@asad:lang', lang);
}

export async function getLang() {
  return await AsyncStorage.getItem('@asad:lang');
}

export function setCurrency(currency) {
  return AsyncStorage.setItem('@asad:currency', currency);
}

export function getCurrency() {
  return AsyncStorage.getItem('@asad:currency');
}

export function setCart(cart) {
  return AsyncStorage.setItem('@asad:cart', cart);
}

export function getCart() {
  return AsyncStorage.getItem('@asad:cart');
}

export function showAlert(title, message) {
  return Alert.alert(title, message, [
    {text: I18n.t('ok'), style: I18n.t('cancel')}
  ]);
}

export function checkImage(img) {
  if (_.has(img, 'sourceURL')) {
    return !_.isUndefined(img.sourceURL) && !_.isNull(img.sourceURL)
      ? true
      : false;
  } else {
    return false;
  }
}
export function getImageExtension(img) {
  return _.has(img, 'filename')
    ? img.filename.substring(img.filename.lastIndexOf('.') + 1)
    : '';
}

export function getImageUri(img) {
  return _.has(img, 'sourceURL') ? img.sourceURL : '';
}

export function getImagePath(img) {
  return _.has(img, 'path') ? img.path : '';
}

export function getImageName(img) {
  return _.has(img, 'filename') ? img.filename : '';
}

export function handleError(e) {
  if (!validate.isEmpty(e.graphQLErrors) && validate.isArray(e.graphQLErrors)) {
    return e.graphQLErrors[0].message;
  } else if (!validate.isEmpty(e.graphQLErrors)) {
    return e.graphQLErrors.message;
  } else if (!validate.isEmpty(e.response)) {
    return e.response.data.message;
  } else {
    return e.message;
  }
}

export function calculateDistance(
  currentLat,
  currentLong,
  latitude,
  longitude
) {
  let currentLongA = !validate.isEmpty(currentLong) ? currentLong : null;
  let currentLatA = !validate.isEmpty(currentLat) ? currentLat : null;
  let latitudeA = !validate.isEmpty(latitude) ? latitude : null;
  let longitudeA = !validate.isEmpty(longitude) ? longitude : null;
  if (
    !validate.isEmpty(currentLatA) &&
    !validate.isEmpty(currentLongA) &&
    !validate.isEmpty(latitudeA) &&
    !validate.isEmpty(longitudeA)
  ) {
    return getDistance(
      {latitude: parseFloat(currentLatA), longitude: currentLongA},
      {latitude: parseFloat(latitudeA), longitude: longitudeA}
    );
  } else {
    return null;
  }
}

export function getHeader(title) {
  return (
    <Text
      style={{
        fontFamily: 'cairo',
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        width: width - 100
      }}>
      {title}
    </Text>
  );
}

export function getTabTitle(title) {
  return (
    <Text
      style={{
        fontFamily: 'cairo',
        color: 'black',
        marginTop: isIOS ? 10 : 3,
        fontSize: isIOS ? 12 : 10
      }}>
      {title}
    </Text>
  );
}

export function isAuthenticated(auth) {
  return !validate.isEmpty(auth.api_token) ? true : false;
}
