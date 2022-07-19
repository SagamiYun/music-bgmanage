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
          label="查找评论内容"
        >
          <q-btn
            style="width: 100px"
            size="sm"
            color="primary"
            label="检索评论"
            @click="fetchData()"
        /></q-input>
      </q-card-section>
    </div>
    <q-table
      :loading="loadingComment"
      :rows="CommentData"
      :columns="columns"
      row-key="name"
      @request="fetchData"
      v-model:pagination="pagination"
    >
      <template v-slot:body-cell-lock="props">
        <q-td :props="props">
          <q-badge
            :color="commentStatusColor[props.value]"
            outline
            :label="commentStatus[props.value]"
          />
        </q-td>
      </template>

      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn-dropdown
            size="sm"
            split
            color="primary"
            label="编辑内容"
            @click="edit(props.row)"
          >
            <q-list dense>
              <q-item
                v-if="props.row.lock === 'TRUE'"
                clickable
                v-close-popup
                @click="freeComment(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>恢复正常</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.lock === 'FALSE'"
                clickable
                v-close-popup
                @click="lockComment(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>封禁</q-item-label>
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
import { commentStatus, commentStatusColor } from '../../utils/dict.js';
import { useCommentSearch } from '../../composables/useCommentSerach.js';
import { free, lock } from '../../api/comment.js';

const columns = [
  {
    field: 'superior',
    label: '从属'
  },
  {
    align: 'center',
    field: 'likes',
    label: '点赞数'
  },
  {
    align: 'center',
    field: 'commentator',
    label: '评论人'
  },
  {
    align: 'center',
    field: 'created_time',
    label: '创建时间'
  },
  {
    name: 'lock',
    field: 'lock',
    align: 'center',
    label: '封禁状态'
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

const { inSearch, CommentData, fetchData, loadingComment } =
  useCommentSearch(pagination);

const freeComment = id => {
  free(id).then(() => {
    notify.success('该评论恢复正常！');
    fetchData();
  });
};
const lockComment = id => {
  lock(id).then(() => {
    notify.success('已封禁该评论！');
    fetchData();
  });
};
</script>

<style scoped></style>
