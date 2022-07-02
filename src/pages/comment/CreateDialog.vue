<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">添加用户</div>
      </q-card-section>
      <q-form @submit="isEdit ? editUser() : createUser()" class="q-gutter-md">
        <q-card-section>
          <q-input
            dense
            v-model="user.username"
            label="用户名"
            autofocus
            @keyup.enter="show = false"
            :rules="[val => (val && val.length > 0) || '请填写用户名！']"
          />

          <q-input
            dense
            v-model="user.nick_name"
            label="昵称"
            autofocus
            @keyup.enter="show = false"
          />

          <q-select v-model="user.sex" :options="options" label="性别" />

          <q-input
            dense
            v-model="user.address"
            label="地址"
            autofocus
            @keyup.enter="show = false"
          />
        </q-card-section>

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
import { create, update } from '../../api/user.js';
import notify from '../../utils/notify.js';
import { userSex } from '../../utils/dict.js';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const options = userSex;
const show = ref(true);

const isEdit = ref(Boolean(props.data));
const user = reactive(props.data || { name: '', description: '' });

const loading = ref(false);

const emmit = defineEmits(['create-success']);
const createUser = () => {
  loading.value = true;
  create(user).then(createdUser => {
    loading.value = false;
    show.value = false;
    notify.success(`用户《${createdUser.username}》创建成功！`);
    emmit('create-success');
  });
};

const editUser = () => {
  loading.value = true;
  update(user).then(updatedUser => {
    loading.value = false;
    console.log(user);
    show.value = false;
    notify.success(`用户《${updatedUser.username}》更新成功！`);
    emmit('edit-success');
  });
};
</script>

<style scoped></style>
