<template>
  <div class="login-page">
    <q-card class="login-form-content">
      <q-form
        class="q-gutter-md"
        @submit="onSubmit(username, nick_name, address, age, sex)"
      >
        <q-input
          filled
          label="用户名："
          v-model="username"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入用户名']"
        />

        <q-input
          filled
          v-model="nick_name"
          label="昵称："
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入昵称']"
        />

        <q-input
          filled
          v-model="address"
          label="地址："
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入地址']"
        />

        <q-input
          filled
          v-model="age"
          label="年龄："
          lazy-rules
          :rules="[val => (val <= 100 && val > 0) || '请输入正确的年龄']"
        />

        <q-select v-model="sex" :options="options" label="性别" />

        <div>
          <q-btn
            class="full-width"
            label="修改个人信息"
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
import { computed, reactive, ref } from 'vue';
import { userSex } from '../utils/dict.js';

const userInfo = reactive(computed(() => store.getters['user/userInfo']));
const options = userSex;
const username = ref(userInfo.value.username);
const nick_name = ref(userInfo.value.nick_name);
const address = ref(userInfo.value.address);
const age = ref(userInfo.value.age);
const sex = ref(userInfo.value.sex);

const onSubmit = (username, nick_name, address, age, sex) => {
  store.dispatch('user/changUserInfo', {
    username,
    nick_name,
    address,
    age,
    sex
  });
};
</script>

<style scoped lang="less">
.login-page {
  width: 75vw;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .ValidCode {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    span {
      display: inline-block;
    }
  }

  .login-form-content {
    .title {
      font-size: 40px;
      text-align: center;
      margin-bottom: 50px;
    }

    width: 400px;
    padding: 20px;
  }
}
</style>
