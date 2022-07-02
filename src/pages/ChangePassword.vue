<template>
  <div class="page">
    <q-card class="login-form-content">
      <q-form
        class="q-gutter-md"
        @submit="onSubmit(password, newPassword, confirmPass)"
      >
        <q-input
          filled
          type="password"
          label="原密码："
          v-model="password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入原密码']"
        />

        <q-input
          filled
          v-model="newPassword"
          type="password"
          label="新密码："
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入新密码']"
        />

        <q-input
          filled
          v-model="confirmPass"
          type="password"
          label="确认密码："
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入确认密码']"
        />

        <div>
          <q-btn
            class="full-width"
            label="修改密码"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script setup>
import store from '../store/index.js';
import router from '../router/index.js';
import { ref } from 'vue';
import notify from '../utils/notify.js';

const confirmPass = ref('');
const newPassword = ref('');
const password = ref('');

const onSubmit = (password, newPassword, confirmPass) => {
  if (newPassword !== confirmPass) {
    notify.error('输入密码必须一致');
    return;
  }
  if (newPassword.length < 8) {
    notify.error('新密码至少在8个字符以上');
    return;
  }
  if (password === newPassword) {
    notify.error('新密码与原密码相同，请重新输入');
    return;
  }
  store.dispatch('user/changPassword', { password, newPassword });
};
</script>

<style scoped></style>
