import axios from 'axios';
import {links} from './../../constants';
import codePush from 'react-native-code-push';
import {
  checkImage,
  getImagePath,
  getImageName,
  getImageExtension,
  getAuthToken
} from './../../helpers';
import validate from 'validate.js';
import {getLangForHeader} from '../../I18n';

const axiosInstance = axios.create({
  baseURL: links.apiUrl,
  headers: {lang: getLangForHeader()}
});

export async function authenticated(api_token) {
  return await axiosInstance
    .post(`authenticated`, {api_token})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function authenticate(element) {
  const {email, password} = element;
  return await axiosInstance
    .post('authenticate', {email, password})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getHomeSliders(type) {
  return await axiosInstance
    .get(`slider`, {params: {type: type}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getRoles() {
  return await axiosInstance
    .get('role')
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getSettings() {
  return await axiosInstance
    .get('setting')
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function userShow(id) {
  return await axiosInstance
    .get(`user`, {params: id})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getProjectById(element) {
  const {id, api_token} = element;
  return await axiosInstance
    .get(`project/${id}`, {params: {api_token}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function postRegisterRequest(payload) {
  const {
    name,
    email,
    mobile,
    description,
    address,
    logo,
    type,
    device_id
  } = payload;
  const formData = new FormData();
  if (checkImage(logo)) {
    formData.append('logo', {
      uri: getImagePath(logo),
      name: getImageName(logo),
      type: getImageExtension(logo)
    });
  }
  formData.append('name', name);
  formData.append('email', email);
  formData.append('mobile', mobile);
  formData.append('type', type);
  formData.append('description', description);
  formData.append('address', address);
  formData.append('device_id', device_id);
  console.log('formData', formData);
  return await axiosInstance
    .post(`request`, formData)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getRegisterRequest(device_id) {
  return await axiosInstance
    .get(`request/${device_id}`)
    .then(r => r.data)
    .catch(e => e.response.data.message);
}
