import { onMounted, ref } from 'vue';
import { search } from '../api/user';

export const useUserSearch = pagination => {
  const data = ref([]);

  const loadingUser = ref(true);

  const fetchData = () => {
    console.log(pagination.value);
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage
    };
    search(pageable).then(res => {
      loadingUser.value = false;
      data.value = res.content;
      pagination.value.page = res.number + 1;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchData);

  return {
    loadingUser,
    data,
    pagination,
    fetchData
  };
};
