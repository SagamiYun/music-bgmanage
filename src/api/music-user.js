import { get, post } from './request';

export const search = paging => {
  return get('/musicUsers/index', { params: paging });
};

export const create = musicUser => {
  return post('/musicUsers/create', musicUser);
};

export const update = musicUser => {
  return post('/musicUsers/update', musicUser);
};

export const lock = id => {
  return post('/musicUsers/lock', id);
};

export const free = id => {
  return post('/musicUsers/free', id);
};

export const upMS = id => {
  return post('/musicUsers/upMembership', id);
};

export const downMS = id => {
  return post('/musicUsers/downMembership', id);
};
