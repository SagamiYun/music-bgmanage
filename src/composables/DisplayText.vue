<template>
  <q-dialog v-model="show" :position="position">
    <q-card style="width: 350px">
      <q-card-section class="row items-center no-wrap">
        <div class="text-h6">公告内容</div>
      </q-card-section>
      <q-card-section class="row items-center no-wrap">
        <div class="text-weight-bold">{{ data }}</div>
        <q-space />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  data: {
    type: String,
    default: ''
  }
});

const show = ref(true);
const position = ref('right');
const text = ref('Field content');
const dense = ref(false);
</script>

<style scoped></style>
