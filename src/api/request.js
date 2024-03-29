import axios from 'axios';
import store from '../store';
import notify from '../utils/notify.js';
import {
  removeCurrentRouter,
  removeCurrentUser,
  removeStatus,
  removeToken
} from '../utils/auth.js';

const baseURL = import.meta.env.VITE_API_HOST;
// const tokenPrefix = 'Bearer ';

export const instance = axios.create({
  baseURL
});

instance.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.state.user.token) {
      config.headers['token'] = store.state.user.token;
      config.headers['status'] = store.state.user.status;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    if (response.data.code) {
      handleErrorResponse(response);
      return Promise.reject(response.data);
    }
    return response.data;
  },
  error => {
    console.log(error);
    handleErrorResponse(error.response);
    return Promise.reject(error);
  }
);

const handleErrorResponse = response => {
  if (response.status === 401 || response.status === 403) {
    store.commit('SET_TOKEN', '');
    store.commit('SET_CURRENT_USER', null);
    store.commit('SET_STATUS', '');
    store.commit('SET_ROUTER', null);
    removeToken();
    removeCurrentUser();
    removeStatus();
    removeCurrentRouter();
    window.location.reload();
  }
  if (response.data instanceof Array) {
    response.data.forEach(item => {
      notify.error(item.message);
    });
  } else {
    notify.error(response.data.message);
  }
};

const { get, post, put } = instance;

export { get, post, put };
