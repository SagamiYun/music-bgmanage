import { get, post, put } from './request.js';

export const list = paging => {
  return get('/musics/index', { params: paging });
};

export const create = music => {
  return post('/musics/create', music);
};

export const update = (id, music) => {
  return put(`/musics/update/${id}`, music);
};

export const publish = id => {
  return post('/musics/publish', id);
};

export const close = id => {
  return post('/musics/close', id);
};
