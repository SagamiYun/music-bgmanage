<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">编辑评论</div>
      </q-card-section>
      <q-form
        @submit="isEdit ? editComment() : createComment()"
        class="q-gutter-md"
      >
        <div class="q-pa-md q-gutter-sm">
          <q-editor
            v-model="comment.content"
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
import { reactive, ref } from 'vue';
import { create, update } from '../../api/comment.js';
import notify from '../../utils/notify.js';

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
const comment = reactive(
  props.data || {
    content: '请输入评论内容'
  }
);

const loading = ref(false);

const emmit = defineEmits(['create-success']);
const createComment = () => {
  loading.value = true;
  create(comment)
    .then(createdComment => {
      loading.value = false;
      show.value = false;
      notify.success(`${createdComment}从属评论创建成功！`);
      emmit('create-success');
    })
    .catch(() => {
      loading.value = false;
    });
};

const editComment = () => {
  loading.value = true;
  update(comment).then(updatedComment => {
    loading.value = false;
    show.value = false;
    notify.success(`${updatedComment}从属评论更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
