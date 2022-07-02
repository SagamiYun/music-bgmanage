import { get, post } from './request';

export const search = paging => {
  return get('/users/index', { params: paging });
};

export const me = () => {
  return get('/login/index');
};

export const create = user => {
  return post('/users/create', user);
};

export const update = user => {
  return post('/users/update', user);
};

export const del = id => {
  return post('/users/delete', id);
};

export const lgt = () => {
  return get('/users/logout');
};

export const changePassword = (password, newPassword) => {
  return post('/users/changePassword', { password, newPassword });
};
