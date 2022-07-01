import { post } from './request';

export const createToken = (username, password) => {
  return post('/token/create', { username, password });
};
