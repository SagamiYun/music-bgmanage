<template>
  <div class="page">
    <q-splitter v-model="splitterModel" style="height: 85vh">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab
            name="api&manage"
            icon="api"
            label="API及后台设置"
            style="height: 43vh"
          />
          <q-tab
            name="app"
            icon="app_shortcut"
            label="APP设置"
            style="height: 42vh"
          />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="api&manage">
            <div class="text-h4 q-mb-md">API & BG</div>
            <div class="text-h6 q-mb-md">登录及文件</div>
            <q-form @submit="configSubmit" class="q-gutter-md">
              <div class="bg-grey-2 q-pa-sm rounded-borders">
                <q-toggle
                  v-model="ConfigData.super_admin_login"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="只允许超级管理员登录"
                />

                <q-toggle
                  v-model="ConfigData.force_logout"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="强制下线功能"
                />

                <q-toggle
                  v-model="ConfigData.upload_admin"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="文件上传功能"
                />
              </div>

              <div class="text-h6 q-mb-md">功能及模块</div>
              <div class="bg-grey-2 q-pa-sm rounded-borders">
                <q-toggle
                  v-model="ConfigData.verification_code"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="验证码"
                />

                <q-toggle
                  v-model="ConfigData.message_board"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="留言板"
                />

                <q-toggle
                  v-model="ConfigData.push_notice"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="系统公告"
                />

                <q-toggle
                  v-model="ConfigData.change_user_info"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="修改个人信息"
                />

                <q-toggle
                  v-model="ConfigData.change_ueer_password"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="修改个人密码"
                />
              </div>

              <div>
                <q-btn
                  label="更新设置"
                  color="primary"
                  @click="configSubmit(ConfigData)"
                />
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="app">
            <div class="text-h4 q-mb-md">APP</div>
            <div class="text-h6 q-mb-md">注册及登陆</div>
            <q-form @submit="appConfigSubmit" class="q-gutter-md">
              <div class="bg-grey-2 q-pa-sm rounded-borders">
                <q-toggle
                  true-value="TRUE"
                  false-value="FALSE"
                  v-model="AppConfigData.email_register"
                  label="邮箱注册"
                />

                <q-toggle
                  v-model="AppConfigData.phone_register"
                  label="手机号注册"
                  true-value="TRUE"
                  false-value="FALSE"
                />
              </div>

              <div class="text-h6 q-mb-md">组件及服务</div>
              <div class="bg-grey-2 q-pa-sm rounded-borders">
                <q-toggle
                  v-model="AppConfigData.allow_search"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="搜索"
                />

                <q-toggle
                  v-model="AppConfigData.allow_comment"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="下载"
                />

                <q-toggle
                  v-model="AppConfigData.open_info"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="消息推送"
                />

                <q-toggle
                  v-model="AppConfigData.pay_model"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="支付模块"
                />

                <q-toggle
                  v-model="AppConfigData.change_user_info"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="修改个人信息"
                />
              </div>

              <div class="text-h6 q-mb-md">评论及审核</div>
              <div class="bg-grey-2 q-pa-sm rounded-borders">
                <q-toggle
                  v-model="AppConfigData.allow_comment"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="评论"
                />

                <q-toggle
                  v-model="AppConfigData.harmonious"
                  true-value="TRUE"
                  false-value="FALSE"
                  label="和谐模式"
                />
              </div>

              <div>
                <q-btn
                  label="Submit"
                  color="primary"
                  @click="appConfigSubmit(AppConfigData)"
                />
              </div>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useConfigSearch } from '../../composables/useConfigSerach.js';
import {
  changeAppConfigSetting,
  changeConfigSetting
} from '../../api/config.js';
import notify from '../../utils/notify.js';

const tab = ref('api&manage');
const splitterModel = ref(20);

const { AppConfigData, ConfigData, fetchData } = useConfigSearch();

const configSubmit = config => {
  changeConfigSetting(config).then(() => {
    notify.success('已更新API及后台配置！');
    fetchData();
  });
};
const appConfigSubmit = config => {
  changeAppConfigSetting(config).then(() => {
    notify.success('已更新App后台配置！');
    fetchData();
  });
};
</script>

<style scoped></style>
