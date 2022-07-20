import { get, post, put } from './request.js';

export const list = paging => {
  return get('/album/index', { params: paging });
};

export const create = album => {
  return post('/album/create', album);
};

export const update = (id, album) => {
  return put(`/album/update/${id}`, album);
};

export const publish = id => {
  return post('/album/publish', id);
};

export const close = id => {
  return post('/album/close', id);
};

export const updateAlbumMusic = (id, AlbumMusic) => {
  return post('/album/updateAlbumMusic', { id, AlbumMusic });
};
