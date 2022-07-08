<template>
  <div class="page">
    <div>欢迎光临 {{ nickname }}</div>
    <q-card flat bordered class="my-card">
      <q-card-section>
        <div class="text-h6">系统公告</div>
      </q-card-section>
      <div class="q-pa-md" style="max-width: 445px">
        <q-list bordered separator>
          <div v-for="item in noticePushList" :key="item.title">
            <q-item clickable v-ripple active-class="menu-active text-white">
              <q-item-section avatar>
                <q-icon color="primary" name="campaign" />
              </q-item-section>
              <q-item-section>{{ item.title }}</q-item-section>
              <q-td>
                <q-btn
                  size="sm"
                  color="primary"
                  label="查看"
                  @click="edit(item.content)"
                />
              </q-td>
            </q-item>
            <q-separator spaced inset />
          </div>
        </q-list>
      </div>
      <q-separator inset />
    </q-card>
  </div>

  <display-text
    v-if="createDialogShow"
    :data="editRow"
    @hide="createDialog.hideDialog()"
    @create-success="fetchData"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';
import { pushList } from '../../api/notice.js';
import DisplayText from '../../composables/DisplayText.vue';
import { useToggleDialog } from '../../composables/useToggleDialog.js';

export default {
  name: 'Index',
  components: { DisplayText },
  setup() {
    const store = useStore();
    const editRow = ref('');
    const noticePushList = ref([]);
    const createDialogShow = ref(false);
    const createDialog = useToggleDialog(createDialogShow);
    const edit = row => {
      editRow.value = row;
      createDialog.showDialog();
    };
    const fetchData = () => {
      pushList().then(getPushList => {
        noticePushList.value = getPushList.content;
      });
    };
    onMounted(fetchData);
    return {
      edit,
      editRow,
      fetchData,
      createDialog,
      noticePushList,
      createDialogShow,
      loadingPushNotice,
      lorem:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      nickname: computed(() => store.state.user.currentUser.nick_name),
      logout: () =>
        store.dispatch('user/logout').then(() => window.location.reload())
    };
  }
};
</script>

<style lang="sass">
.my-card
  cursor: pointer
  margin-right: 30px
  position: absolute
  right: 0
  width: 100vw
  max-width: 450px
</style>
