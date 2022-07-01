<script setup>
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
// TODO onMounted函数主要用于数据提前挂载与渲染，用于文件上传使用
// onMounted(store.dispatch('setting/fetchSiteSetting'));
</script>

<template>
  <router-view />
</template>

<style></style>
