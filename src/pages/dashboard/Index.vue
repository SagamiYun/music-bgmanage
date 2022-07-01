<template>
  <div className="page">
    <div>欢迎光临 {{ nickname }}</div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'Index',
  setup() {
    const store = useStore();
    return {
      nickname: computed(() => store.state.user.currentUser.nick_name),
      logout: () =>
        store.dispatch('user/logout').then(() => window.location.reload())
    };
  }
};
</script>

<style scoped>
.container-fluid {
  margin: 0;
  padding: 0;
}
</style>
