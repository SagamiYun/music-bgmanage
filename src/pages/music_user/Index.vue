<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-card-section>
        <q-input
          dense
          filled
          square
          style="width: 500px"
          v-model="inSearch"
          label="查找用户名"
        >
          <q-btn
            style="width: 100px"
            size="sm"
            color="primary"
            label="检索用户"
            @click="fetchData()"
        /></q-input>
      </q-card-section>
    </div>
    <q-table
      :loading="loadingMusicUser"
      :rows="MusicUserData"
      :columns="columns"
      row-key="name"
      @request="fetchData"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="userStatusColor[props.value]"
            outline
            :label="userStatus[props.value]"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-membership="props">
        <q-td :props="props">
          <q-badge
            :color="membershipStatusColor[props.value]"
            outline
            :label="membershipStatus[props.value]"
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
                v-if="props.row.status !== 'LOCKED'"
                clickable
                v-close-popup
                @click="lockUser(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>封禁该用户</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'LOCKED'"
                clickable
                v-close-popup
                @click="freeUser(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>解禁该用户</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.membership !== 'TRUE'"
                clickable
                v-close-popup
                @click="upMembership(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>修改当前用户为会员</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.membership !== 'FALSE'"
                clickable
                v-close-popup
                @click="downMembership(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>修改当前用户为非会员</q-item-label>
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
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { ref } from 'vue';
import {
  userStatus,
  userStatusColor,
  membershipStatus,
  membershipStatusColor
} from '../../utils/dict.js';
import { useMusicUserSearch } from '../../composables/useMusicUserSerach.js';
import { downMS, free, lock, upMS } from '../../api/music-user.js';
import notify from '../../utils/notify.js';

const columns = [
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: 'nick_name',
    align: 'center',
    label: '昵称'
  },
  {
    field: 'sex',
    align: 'center',
    label: '性别'
  },
  {
    field: 'phone',
    align: 'center',
    label: '绑定手机号'
  },
  {
    field: 'email',
    align: 'center',
    label: '绑定邮箱'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '登录状态'
  },
  {
    name: 'membership',
    field: 'membership',
    align: 'center',
    label: '会员状态'
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
  console.log(editRow.value);
  createDialog.showDialog();
};
const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

const lockUser = id => {
  lock(id).then(() => {
    notify.success('已封禁该用户！');
    fetchData();
  });
};
const freeUser = id => {
  free(id).then(() => {
    notify.success('已解禁该用户！');
    fetchData();
  });
};
const upMembership = id => {
  upMS(id).then(() => {
    notify.success('已修改当前用户为会员！');
    fetchData();
  });
};
const downMembership = id => {
  downMS(id).then(() => {
    notify.success('已修改当前用户为非会员！');
    fetchData();
  });
};

const { MusicUserData, fetchData, loadingMusicUser, inSearch } =
  useMusicUserSearch(pagination);
</script>

<style scoped></style>
