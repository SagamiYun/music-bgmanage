import Cookies from 'js-cookie';

const TokenKey = 'SaKaTi-token';
const UserKey = 'current-user';
const StatusKey = 'current-status';
const RouterKey = 'current-router';

const defaultUser = {
  username: null,
  nickname: null,
  status: null
};

export const getStatus = () => {
  return Cookies.get(StatusKey);
};

export const setStatus = status => {
  return Cookies.set(StatusKey, status);
};

export const removeStatus = () => {
  Cookies.remove(StatusKey);
};

export const getToken = () => {
  return Cookies.get(TokenKey);
};

export const setToken = token => {
  return Cookies.set(TokenKey, token);
};

export const removeToken = () => {
  Cookies.remove(TokenKey);
};

export const setCurrentUser = currentUser => {
  return Cookies.set(UserKey, JSON.stringify(currentUser));
};

export const getCurrentUser = () => {
  const user = Cookies.get(UserKey);
  return user === undefined ? defaultUser : JSON.parse(user);
};

export const removeCurrentUser = () => {
  Cookies.remove(UserKey);
};

export const setCurrentRouter = currentRouter => {
  return Cookies.set(RouterKey, currentRouter);
};

export const getCurrentRouter = () => {
  return Cookies.get(RouterKey);
};

export const removeCurrentRouter = () => {
  Cookies.remove(RouterKey);
};
