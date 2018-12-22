import axios from 'axios';
import {isIOS, links} from './../../constants';
import {
  checkImage,
  getImagePath,
  getImageName,
  getImageExtension
} from './../../helpers';
import {getLangForHeader} from '../../I18n';

console.log('the api link', links.apiUrl);
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
  const {email, password, device_id, player_id} = element;
  return await axiosInstance
    .post('authenticate', {
      email,
      password,
      device_id,
      player_id,
      device_type: isIOS ? 0 : 1
    })
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

export async function getCategories(element) {
  const {project_id, api_token} = element;
  return await axiosInstance
    .get('category', {params: {project_id, api_token}})
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
  __DEV__ ? console.log('formData', formData) : null;
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

export async function getGalleries(type, element_id) {
  return await axiosInstance
    .get(`gallery`, {params: type, element_id})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function getSearchingProjects(element) {
  const {text, api_token} = element;
  const searchInstance = axios.create({
    baseURL: links.apiUrl,
    headers: {
      lang: getLangForHeader(),
      Authorization: 'Bearer ' + api_token
    }
  });
  return await searchInstance
    .get(`search`, {params: {text}})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}

export async function forgetPassword(payload) {
  const {email, mobile} = payload;
  return await axiosInstance
    .post('forget/password', {email, mobile})
    .then(r => r.data)
    .catch(e => e.response.data.message);
}
