import { get, post } from './request';

export const search = paging => {
  return get('/roles/index', { params: paging });
};

export const searchPermission = paging => {
  return get('/roles/permission', { params: paging });
};

export const userUpRole = id => {
  return post('/roles/upRole', id);
};

export const userDownRole = id => {
  return post('/roles/downRole', id);
};

export const changeRolePermission = (id, rolePermissions) => {
  return post('/roles/changePermission', { id, rolePermissions });
};
