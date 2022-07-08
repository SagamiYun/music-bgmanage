import { onMounted, ref } from 'vue';
import { search } from '../api/notice.js';

export const useNoticeSearch = pagination => {
  const NoticeData = ref([]);
  const loadingNotice = ref(true);

  const fetchData = () => {
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage
    };
    search(pageable).then(res => {
      loadingNotice.value = false;
      NoticeData.value = res.content;
      pagination.value.page = res.number + 1;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchData);

  return {
    loadingNotice,
    NoticeData,
    pagination,
    fetchData
  };
};
