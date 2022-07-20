import { onMounted, ref } from 'vue';
import { getAppConfigSetting, getConfigSetting } from '../api/config.js';

export const useConfigSearch = () => {
  const ConfigData = ref('');
  const AppConfigData = ref('');

  const fetchData = () => {
    getConfigSetting().then(res => {
      ConfigData.value = res.content;
    });
    getAppConfigSetting().then(res => {
      AppConfigData.value = res.content;
    });
  };

  onMounted(fetchData);

  return {
    AppConfigData,
    ConfigData,
    fetchData
  };
};
