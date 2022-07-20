<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加歌单" @click="edit" />
    </div>
    <q-table
      :columns="columns"
      :rows="data"
      row-key="id"
      :loading="loadingSongsheet"
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
          <q-btn
            size="sm"
            style="background: #ff9800; color: white"
            label="编辑歌曲关系"
            @click="editMusic(props.row)"
          />
          <q-btn-dropdown
            style="margin-left: 5px"
            size="sm"
            split
            color="primary"
            label="编辑内容"
            @click="edit(props.row)"
          >
            <q-list dense>
              <q-item
                v-if="props.row.status !== 'PUSH'"
                clickable
                v-close-popup
                @click="publishSongsheet(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上线</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'PUSH'"
                clickable
                v-close-popup
                @click="closeSongsheet(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>下线</q-item-label>
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
    <edit-songsheet-music
      v-if="createRelationshipShow"
      :data="{ editRow, musicOption }"
      @hide="createRelationship.hideDialog()"
      @create-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { close, list, publish } from '../../api/songsheet.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { noticeStatus, noticeStatusColor } from '../../utils/dict.js';
import notify from '../../utils/notify.js';
import EditSongsheetMusic from './EditSongsheetMusic.vue';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '歌单名'
  },
  {
    name: 'description',
    field: 'description',
    label: '简介'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '上架状态'
  },
  {
    align: 'center',
    name: 'operation',
    field: 'operation',
    label: '操作'
  }
];
const data = ref([]);
const musicOption = ref([]);
const createDialogShow = ref(false);
const createRelationshipShow = ref(false);
const createDialog = useToggleDialog(createDialogShow);
const createRelationship = useToggleDialog(createRelationshipShow);
const editRow = ref(null);
const loadingSongsheet = ref(true);
const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

const edit = row => {
  editRow.value = row;
  createDialog.showDialog();
};
const editMusic = row => {
  editRow.value = row;
  createRelationship.showDialog();
};

const fetchData = () => {
  const pageable = {
    page: pagination.value.page - 1,
    size: pagination.value.rowsPerPage
  };
  list(pageable).then(songsheetList => {
    loadingSongsheet.value = false;
    data.value = songsheetList.content;
    pagination.value.page = songsheetList.number + 1;
    pagination.value.rowsNumber = songsheetList.totalElements;
    musicOption.value = songsheetList.music;
  });
};

onMounted(fetchData);

const publishSongsheet = id => {
  publish(id).then(() => {
    notify.success('歌单上线成功！');
    fetchData();
  });
};
const closeSongsheet = id => {
  close(id).then(() => {
    notify.success('歌单下线成功！');
    fetchData();
  });
};
</script>

<style scoped></style>
