import { get, post } from './request.js';

export const getConfigSetting = () => {
  return get('/configs/config');
};

export const getAppConfigSetting = () => {
  return get('/configs/appConfig');
};

export const changeConfigSetting = config => {
  return post('/configs/updateConfig', config);
};

export const changeAppConfigSetting = config => {
  return post('/configs/updateAppConfig', config);
};
