import axios from 'axios';
import {links} from './../../constants';
import codePush from 'react-native-code-push';
import {
  checkImage,
  getImagePath,
  getImageName,
  getImageExtension
} from './../../helpers';
import validate from 'validate.js';
import {getLangForHeader} from '../../I18n';

const axiosInstance = axios.create({
  baseURL: links.apiUrl,
  headers: {lang: getLangForHeader()}
});

export async function getUser(api_token) {
  return await axiosInstance
    .post(`authenticated`, {api_token})
    .then(r => r.data)
    .catch(e => e.response.message);
}

export async function getHomeSliders(type) {
  return await axiosInstance
    .get(`slider`, {params: {type: type}})
    .then(r => r.data)
    .catch(e => e);
}

export async function getRoles() {
  return await axiosInstance
    .get('role')
    .then(r => r.data)
    .catch(e => e);
}

export async function getSettings() {
  return await axiosInstance
    .get('setting')
    .then(r => r.data)
    .catch(e => e);
}

export async function userShow(id) {
  return await axiosInstance
    .get(`user`, {params: id})
    .then(r => r.data)
    .catch(e => e.response.message);
}

export async function projectShow(id) {
  return await axiosInstance
    .get(`project`, {params: id})
    .then(r => r.data)
    .catch(e => e.response.message);
}

export async function uploadImages(action) {
  const {auth, state} = action.payload;
  const {logo, images, categoryName} = state;
  const formData = new FormData();
  if (checkImage(logo)) {
    formData.append('logo', {
      uri: getImagePath(logo),
      name: getImageName(logo),
      type: getImageExtension(logo)
    });
    // console.log('formData from logo', formData);
  }
  map(images, (img, i) => {
    if (!validate.isEmpty(img) && checkImage(img)) {
      formData.append(`gallery[${i}]`, {
        uri: getImagePath(img),
        name: getImageName(img),
        type: getImageExtension(img)
      });
    }
  });
  formData.append('email', state.email);
  formData.append('name_ar', state.name_ar);
  formData.append('name_en', state.name_en);
  formData.append('api_token', auth.api_token);
  formData.append('id', auth.id);
  formData.append('categoryName', categoryName);
  formData.append('_method', 'PATCH');
  return await axiosInstance
    .post(`user/${auth.id}`, formData)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}
