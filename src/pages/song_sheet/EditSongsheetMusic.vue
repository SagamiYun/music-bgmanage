<template>
  <q-dialog v-model="show" persistent>
    <q-card style="min-width: 350px; padding: 20px 10px">
      <q-card-section>
        <div class="text-h6">编辑歌曲歌单关系</div>
      </q-card-section>
      <q-form @submit="editSongsheet()" class="q-gutter-md">
        <q-card-section>
          <q-input
            dense
            readonly
            v-model="songsheet.name"
            label="歌单名"
            autofocus
            @keyup.enter="show = false"
          />

          <q-select
            style="width: 300px"
            option-value="id"
            option-label="name"
            options-dense
            transition-show="flip-up"
            transition-hide="flip-down"
            v-model="songsheet.songsheet_musics"
            :options="options"
            label="歌曲选择"
            multiple
            use-chips
          >
            <template
              v-slot:option="{ itemProps, opt, selected, toggleOption }"
            >
              <q-item v-bind="itemProps">
                <q-item-section>
                  <q-item-label v-html="opt.label" />
                </q-item-section>
                <q-item-section side>
                  <q-toggle
                    :model-value="selected"
                    @update:model-value="toggleOption(opt)"
                  />
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
import notify from '../../utils/notify.js';
import { updateSongsheetMusic } from '../../api/songsheet.js';

const props = defineProps({
  data: {
    type: Object,
    default() {
      return null;
    }
  }
});

const show = ref(true);
const options = ref(props.data.musicOption);
const songsheet = reactive(props.data.editRow || { name: '' });
const editSongsheet = () => {
  updateSongsheetMusic(songsheet.id, songsheet.songsheet_musics).then(() => {
    show.value = false;
    notify.success(`歌单关联音乐更新成功！`);
  });
};
</script>

<style scoped></style>
