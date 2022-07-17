<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加艺术家</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editArtist() : createArtist()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            dense
            v-model="artist.name"
            label="艺术家名称"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写艺术家名称！']"
          />

          <q-input
            dense
            v-model="artist.remark"
            label="简介"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>
        <q-card-section>
          <uploader label="上传艺术家图片" v-model:file="artist.artist_file" />
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
import { create, update } from '../../api/artist.js';
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
const artist = reactive(
  props.data || { name: '', remark: '', artist_file: null }
);

const emmit = defineEmits(['create-success']);
const createArtist = () => {
  create(artist).then(createdArtist => {
    show.value = false;
    notify.success(`艺术家${createdArtist}创建成功！`);
    emmit('create-success');
  });
};

const editArtist = () => {
  update(artist.id, artist).then(updatedArtist => {
    show.value = false;
    notify.success(`艺术家${updatedArtist}更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
