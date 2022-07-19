<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">编辑公告</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editNotice() : createNotice()"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-input
            dense
            v-model="notice.title"
            label="公告标题"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写公告标题！']"
          />

          <q-input
            readonly
            dense
            v-model="notice.author"
            label="作者"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>
        <div class="q-pa-md q-gutter-sm">
          <q-editor
            v-model="notice.content"
            :definitions="{
              bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
            }"
          />
        </div>

        <q-card-actions align="right" class="text-primary">
          <q-btn
            :loading="loading"
            label="确认"
            type="submit"
            color="primary"
          />
          <q-btn flat label="取消" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import { create, update } from '../../api/notice.js';
import notify from '../../utils/notify.js';
import store from '../../store/index.js';

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
const userInfo = reactive(computed(() => store.getters['user/userInfo']));
const notice = reactive(
  props.data || {
    author: userInfo.value.username,
    content: '请输入公告内容'
  }
);

const author = ref(userInfo.username || '');
const loading = ref(false);

const emmit = defineEmits(['create-success']);
const createNotice = () => {
  loading.value = true;
  create(notice)
    .then(createdNotice => {
      loading.value = false;
      show.value = false;
      notify.success(`公告《${createdNotice.title}》创建成功！`);
      emmit('create-success');
    })
    .catch(() => {
      loading.value = false;
    });
};

const editNotice = () => {
  loading.value = true;
  update(notice).then(updatedUser => {
    loading.value = false;
    show.value = false;
    notify.success(`公告《${updatedUser.title}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
