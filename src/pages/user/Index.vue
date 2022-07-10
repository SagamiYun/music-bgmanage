<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn
        color="primary"
        label="添加用户"
        @click="createDialog.showDialog()"
      />
    </div>
    <q-table
      :loading="loadingUser"
      :rows="data"
      :columns="columns"
      row-key="name"
      @request="fetchData"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="loginStatusColor[props.value]"
            outline
            :label="loginStatus[props.value]"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn-dropdown
            size="sm"
            split
            color="primary"
            label="编辑"
            @click="edit(props.row)"
          >
            <q-list dense>
              <q-item
                clickable
                v-close-popup
                @click="deleteUser(props.row.id)"
                v-if="props.row.status !== 1"
              >
                <q-item-section>
                  <q-item-label>删除</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-td>
      </template>
    </q-table>
    <create-dialog
      v-if="createDialogShow"
      :data="editRow"
      @hide="createDialog.hideDialog()"
      @create-success="fetchData"
    />
  </div>
</template>

<script setup>
import { useUserSearch } from '../../composables/useUserSearch.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { ref } from 'vue';
import notify from '../../utils/notify.js';
import { del } from '../../api/user.js';
import { loginStatus, loginStatusColor } from '../../utils/dict.js';

const columns = [
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nick_name',
    label: '昵称'
  },
  {
    field: 'sex',
    label: '性别'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '登录状态'
  },
  {
    field: 'last_login_ip',
    label: '最后登陆地址'
  },
  {
    name: 'operation',
    field: 'operation',
    label: '操作'
  }
];
const editRow = ref(null);
const createDialogShow = ref(false);
const createDialog = useToggleDialog(createDialogShow);
const edit = row => {
  editRow.value = row;
  createDialog.showDialog();
};
const pagination = ref({
  page: 1,
  rowsPerPage: 10
});
const deleteUser = id => {
  del(id).then(() => {
    notify.success('删除用户成功！');
    fetchData();
  });
};

const { data, fetchData, loadingUser } = useUserSearch(pagination);
</script>

<style scoped></style>
