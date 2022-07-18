import { onMounted, ref } from 'vue';
import { search } from '../api/music-user.js';

export const useMusicUserSearch = pagination => {
  const MusicUserData = ref([]);
  const loadingMusicUser = ref(true);
  const inSearch = ref('');

  const fetchData = () => {
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage,
      search: inSearch.value
    };
    search(pageable).then(res => {
      loadingMusicUser.value = false;
      MusicUserData.value = res.content;
      pagination.value.page = res.number + 1;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchData);

  return {
    inSearch,
    loadingMusicUser,
    MusicUserData,
    pagination,
    fetchData
  };
};
