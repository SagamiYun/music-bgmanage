<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn
        color="primary"
        label="添加公告"
        @click="createDialog.showDialog()"
      />
    </div>
    <q-table
      :loading="loadingNotice"
      :rows="NoticeData"
      :columns="columns"
      row-key="name"
      @request="fetchData"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="noticeStatusColor[props.value]"
            outline
            :label="noticeStatus[props.value]"
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
                v-if="props.row.status !== 'PUSH'"
                clickable
                v-close-popup
                @click="pushNotice(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上线</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'PUSH'"
                clickable
                v-close-popup
                @click="closeNotice(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>下线</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <q-list dense>
              <q-item
                v-if="props.row.status !== 'PUSH'"
                clickable
                v-close-popup
                @click="deleteNotice(props.row.id)"
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
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { ref } from 'vue';
import notify from '../../utils/notify.js';
import { del, push, close } from '../../api/notice.js';
import { noticeStatus, noticeStatusColor } from '../../utils/dict.js';
import { useNoticeSearch } from '../../composables/useNoticeSerach.js';

const columns = [
  {
    field: 'title',
    label: '公告'
  },
  {
    field: 'author',
    label: '作者'
  },
  {
    field: 'created_time',
    label: '创建时间'
  },
  {
    field: 'updated_time',
    label: '更新时间'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '公告状态'
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
const deleteNotice = id => {
  del(id).then(() => {
    notify.success('删除成功！');
    fetchData();
  });
};
const { NoticeData, fetchData, loadingNotice } = useNoticeSearch(pagination);

const pushNotice = id => {
  push(id).then(() => {
    notify.success('公告上线成功！');
    fetchData();
  });
};
const closeNotice = id => {
  close(id).then(() => {
    notify.success('公告下线成功！');
    fetchData();
  });
};
</script>

<style scoped></style>
