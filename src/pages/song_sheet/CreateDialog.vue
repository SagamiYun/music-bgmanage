<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加歌单</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editSongsheet() : createSongsheet()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            dense
            v-model="songsheet.name"
            label="歌单名"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写歌单名！']"
          />

          <q-input
            dense
            v-model="songsheet.description"
            label="简介"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section>
          <uploader
            label="上传歌单图片"
            v-model:file="songsheet.songsheet_file"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn label="确认" type="submit" color="primary" />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { create, update } from '../../api/songsheet.js';
import notify from '../../utils/notify.js';
import Uploader from '../../composables/Uploader.vue';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const show = ref(true);

const isEdit = ref(Boolean(props.data));
const songsheet = reactive(
  props.data || { name: '', description: '', songsheet_file: null }
);

const emmit = defineEmits(['create-success']);
const createSongsheet = () => {
  create(songsheet).then(createdSongsheet => {
    show.value = false;
    notify.success(`歌单《${createdSongsheet}》创建成功！`);
    emmit('create-success');
  });
};

const editSongsheet = () => {
  update(songsheet.id, songsheet).then(updatedSongsheet => {
    show.value = false;
    notify.success(`歌单《${updatedSongsheet}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
