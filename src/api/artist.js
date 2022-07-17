import { get, post, put } from './request.js';

export const list = paging => {
  return get('/artists/index', { params: paging });
};

export const create = artist => {
  return post('/artists/create', artist);
};

export const update = (id, artist) => {
  return put(`/artists/update/${id}`, artist);
};

export const publish = id => {
  return post('/artists/publish', id);
};

export const close = id => {
  return post('/artists/close', id);
};
