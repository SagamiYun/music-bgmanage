import { get, post } from './request';

export const search = paging => {
  return get('/notice/index', { params: paging });
};

export const pushList = () => {
  return get('/notice/readPush');
};

export const create = notice => {
  return post('/notice/create', notice);
};

export const update = notice => {
  return post('/notice/update', notice);
};

export const del = id => {
  return post('/notice/delete', id);
};

export const push = id => {
  return post('/notice/push', id);
};

export const close = id => {
  return post('/notice/close', id);
};
