<template>
  <div class="login-page">
    <q-card class="login-form-content">
      <div class="title">SaKaTi音乐后台</div>
      <q-form class="q-gutter-md" @submit="onSubmit(username, password)">
        <q-input
          filled
          label="用户名："
          v-model="username"
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入用户名']"
        />

        <q-input
          filled
          v-model="password"
          type="password"
          label="密码："
          lazy-rules
          :rules="[val => (val && val.length > 0) || '请输入密码']"
        />

        <!--TODO 请重构刷新页面后的数据-->
        <div style="display: flex" v-if="connt === 3">
          <q-input
            prefix-icon="el-icon-key"
            v-model="nowValidCode"
            style="width: 70%"
            placeholder="请输入验证码"
            :rules="[val => (val && val.length > 0) || '请输入验证码']"
          ></q-input>
          <valid-code @input="createValidCode" />
        </div>

        <div>
          <q-btn
            class="full-width"
            label="登录"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import ValidCode from '../composables/ValidCode.vue';
import Notify from '../utils/notify.js';

export default {
  name: 'Login',
  components: { ValidCode },
  setup() {
    let validCode = ref('');
    let connt = ref(3);
    const nowValidCode = ref('');
    const accept = ref(false);
    const username = ref('');
    const password = ref('');
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const $q = useQuasar();
    const createValidCode = data => {
      validCode.value = data;
    };
    const onSubmit = (username, password) => {
      if (nowValidCode.value.toLowerCase() !== validCode.value.toLowerCase()) {
        Notify.error('验证码错误');
        return;
      }
      store.dispatch('user/login', { username, password }).then(() => {
        router.push({ path: route.query.redirect || '/' });
        store.dispatch('user/fetchCurrentUser').then(() => {
          router.push({ path: route.query.redirect || '/' });
        });
      });
    };
    return {
      connt,
      accept,
      username,
      password,
      onSubmit,
      validCode,
      createValidCode,
      nowValidCode
    };
  }
};
</script>

<style scoped lang="less">
.login-page {
  width: 100vw;
  height: 100vh;
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
