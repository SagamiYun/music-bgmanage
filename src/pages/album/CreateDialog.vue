<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加专辑</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editAlbum() : createAlbum()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            dense
            v-model="album.name"
            label="专辑名"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写音乐名！']"
          />

          <q-input
            dense
            v-model="album.description"
            label="简介"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section>
          <uploader label="上传专辑图片" v-model:file="album.album_file" />
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
import { create, update } from '../../api/album.js';
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

const file = ref(null);
const isEdit = ref(Boolean(props.data));
const album = reactive(props.data || { name: '', description: '', file: null });

const emmit = defineEmits(['create-success']);
const createAlbum = () => {
  create(album).then(createdAlbum => {
    show.value = false;
    notify.success(`专辑《${createdAlbum}》创建成功！`);
    emmit('create-success');
  });
};

const editAlbum = () => {
  update(album.id, album).then(updatedAlbum => {
    show.value = false;
    notify.success(`专辑《${updatedAlbum}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
