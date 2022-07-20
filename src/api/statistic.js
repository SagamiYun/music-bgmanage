import { get } from './request.js';

export const getUserAddress = () => {
  return get('/statistics/userAddressCount');
};
