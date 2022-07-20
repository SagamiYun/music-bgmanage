<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn color="primary" label="添加专辑" @click="edit" />
    </div>
    <q-table
      :columns="columns"
      :rows="data"
      row-key="id"
      :loading="loadingAlbum"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="musicStatusColor[props.value]"
            outline
            :label="musicStatus[props.value]"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            style="background: #ff0080; color: white; margin-right: 5px"
            label="编辑歌曲关系"
            @click="editMusic(props.row)"
          />
          <q-btn-dropdown
            size="sm"
            split
            color="primary"
            label="编辑内容"
            @click="edit(props.row)"
          >
            <q-list dense>
              <q-item
                v-if="props.row.status !== 'PUBLISHED'"
                clickable
                v-close-popup
                @click="publishAlbum(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上架</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'PUBLISHED'"
                clickable
                v-close-popup
                @click="closeAlbum(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>下架</q-item-label>
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
    <edit-album-music
      v-if="createRelationshipShow"
      :data="{ editRow, musicOption }"
      @hide="createRelationship.hideDialog()"
      @create-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { close, list, publish } from '../../api/album.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { musicStatus, musicStatusColor } from '../../utils/dict.js';
import notify from '../../utils/notify.js';
import EditAlbumMusic from './EditAlbumMusic.vue';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '专辑名'
  },
  {
    align: 'center',
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
const loadingAlbum = ref(true);
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
  list(pageable).then(albumList => {
    loadingAlbum.value = false;
    data.value = albumList.content;
    pagination.value.page = albumList.number + 1;
    pagination.value.rowsNumber = albumList.totalElements;
    musicOption.value = albumList.music;
  });
};

onMounted(fetchData);

const publishAlbum = id => {
  publish(id).then(() => {
    notify.success('专辑上架成功！');
    fetchData();
  });
};
const closeAlbum = id => {
  close(id).then(() => {
    notify.success('专辑下架成功！');
    fetchData();
  });
};
</script>

<style scoped></style>
