import { get, post } from './request';

export const search = paging => {
  return get('/comments/index', { params: paging });
};

export const create = comment => {
  return post('/comments/create', comment);
};

export const update = comment => {
  return post('/comments/update', comment);
};

export const lock = id => {
  return post('/comments/lock', id);
};

export const free = id => {
  return post('/comments/free', id);
};
