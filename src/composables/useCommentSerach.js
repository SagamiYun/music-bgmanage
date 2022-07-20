import { onMounted, ref } from 'vue';
import { search } from '../api/comment.js';

export const useCommentSearch = pagination => {
  const CommentData = ref([]);
  const loadingComment = ref(true);
  const inSearch = ref('');

  const fetchData = () => {
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage,
      search: inSearch.value
    };
    search(pageable).then(res => {
      loadingComment.value = false;
      CommentData.value = res.content;
      pagination.value.page = res.number + 1;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchData);

  return {
    inSearch,
    loadingComment,
    CommentData,
    pagination,
    fetchData
  };
};
