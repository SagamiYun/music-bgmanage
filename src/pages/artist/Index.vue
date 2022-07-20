<template>
  <div class="page">
    <div class="q-mt-md q-mb-md">
      <q-btn
        color="primary"
        label="添加艺术家"
        @click="createDialog.showDialog()"
      />
    </div>
    <q-table
      :columns="columns"
      :rows="data"
      row-key="id"
      :loading="loadingArtist"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            :color="artistStatusColor[props.value]"
            outline
            :label="artistStatus[props.value]"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-operation="props">
        <q-td :props="props">
          <q-btn
            size="sm"
            style="background: #009688; color: white; margin-right: 5px"
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
                @click="publishArtist(props.row.id)"
              >
                <q-item-section>
                  <q-item-label>上线</q-item-label>
                </q-item-section>
              </q-item>
              <q-item
                v-if="props.row.status === 'PUBLISHED'"
                clickable
                v-close-popup
                @click="closeArtist(props.row.id)"
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
    <edit-artist-music
      v-if="createRelationshipShow"
      :data="{ editRow, musicOption }"
      @hide="createRelationship.hideDialog()"
      @create-success="fetchData"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { close, list, publish } from '../../api/artist.js';
import { useToggleDialog } from '../../composables/useToggleDialog.js';
import CreateDialog from './CreateDialog.vue';
import { artistStatus, artistStatusColor } from '../../utils/dict.js';
import notify from '../../utils/notify.js';
import EditArtistMusic from './EditArtistMusic.vue';

const columns = [
  {
    name: 'name',
    field: 'name',
    label: '艺术家名'
  },
  {
    name: 'remark',
    field: 'remark',
    align: 'center',
    label: '艺术家简介'
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
const loadingArtist = ref(true);
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
  list(pageable).then(artistList => {
    loadingArtist.value = false;
    data.value = artistList.content;
    pagination.value.page = artistList.number + 1;
    pagination.value.rowsNumber = artistList.totalElements;
    musicOption.value = artistList.music;
  });
};

onMounted(fetchData);

const publishArtist = id => {
  publish(id).then(() => {
    notify.success('已成功上线该艺术家！');
    fetchData();
  });
};
const closeArtist = id => {
  close(id).then(() => {
    notify.success('已成功下线该艺术家！');
    fetchData();
  });
};
</script>

<style scoped></style>
