import { get, post, put } from './request.js';

export const list = paging => {
  return get('/songsheet/index', { params: paging });
};

export const create = songsheet => {
  return post('/songsheet/create', songsheet);
};

export const update = (id, songsheet) => {
  return put(`/songsheet/update/${id}`, songsheet);
};

export const publish = id => {
  return post('/songsheet/publish', id);
};

export const close = id => {
  return post('/songsheet/close', id);
};
