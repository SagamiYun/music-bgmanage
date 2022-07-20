import { onMounted, ref } from 'vue';
import { search, searchPermission } from '../api/role.js';

export const useRolesFetchData = pagination => {
  const roleData = ref([]);
  const loadingRole = ref(true);

  const fetchData = () => {
    const pageable = {
      page: pagination.value.page - 1,
      size: pagination.value.rowsPerPage
    };
    search(pageable).then(res => {
      loadingRole.value = false;
      roleData.value = res.content;
      pagination.value.page = res.number + 1;
      pagination.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchData);

  return {
    loadingRole,
    roleData,
    pagination,
    fetchData
  };
};

export const useRouterPermissionFetchData = paginationPermission => {
  const permissionData = ref([]);
  const loadingPermission = ref(true);

  const fetchPermissionData = () => {
    const pageable = {
      page: paginationPermission.value.page - 1,
      size: paginationPermission.value.rowsPerPage
    };
    searchPermission(pageable).then(res => {
      loadingPermission.value = false;
      permissionData.value = res.content;
      paginationPermission.value.page = res.number + 1;
      paginationPermission.value.rowsNumber = res.totalElements;
    });
  };

  onMounted(fetchPermissionData);

  return {
    loadingPermission,
    permissionData,
    paginationPermission,
    fetchPermissionData
  };
};
