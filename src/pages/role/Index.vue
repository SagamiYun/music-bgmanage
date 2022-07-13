<template>
  <div class="page">
    <div class="q-pa-md">
      <q-carousel
        style="height: 75vh"
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide name="adminRole" class="column no-wrap flex-center">
          <div class="q-mt-md text-center" style="width: 70vw; height: 75vh">
            <q-table
              :loading="loadingRole"
              :rows="roleData"
              :columns="admin_columns"
              row-key="name"
              @request="fetchData"
              v-model:pagination="pagination"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge
                    :color="loginStatusColor[props.value]"
                    outline
                    :label="loginStatus[props.value]"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-operation="props">
                <q-td :props="props">
                  <q-btn-group push>
                    <q-btn
                      v-if="
                        props.row.admin_roles[0].name !== 'admin' &&
                        props.row.admin_roles[0].name !== 'super_admin'
                      "
                      size="sm"
                      color="yellow"
                      glossy
                      text-color="black"
                      push
                      label="普通管理员"
                      @click="downRole(props.row.id)"
                    />
                    <q-btn
                      v-if="
                        props.row.admin_roles[0].name !== 'senior_admin' &&
                        props.row.admin_roles[0].name !== 'super_admin'
                      "
                      size="sm"
                      color="orange"
                      glossy
                      text-color="black"
                      push
                      label="高级管理员"
                      @click="upRole(props.row.id)"
                    />
                    <q-btn
                      v-if="
                        props.row.status === 1 &&
                        userInfo.username !== props.row.username &&
                        props.row.admin_roles[0].name !== 'super_admin'
                      "
                      size="sm"
                      color="deep-orange"
                      glossy
                      label="强制下线"
                      @click="forcedLogout(props.row.id)"
                    />
                    <q-btn
                      v-if="
                        props.row.status === 0 &&
                        userInfo.username !== props.row.username &&
                        props.row.admin_roles[0].name !== 'super_admin'
                      "
                      size="sm"
                      color="deep-orange"
                      glossy
                      label="封禁该管理员"
                      @click="blocked(props.row.id)"
                    />
                    <q-btn
                      v-if="
                        props.row.status === 2 &&
                        userInfo.username !== props.row.username &&
                        props.row.admin_roles[0].name !== 'super_admin'
                      "
                      size="sm"
                      color="green"
                      glossy
                      label="解禁该管理员"
                      @click="free(props.row.id)"
                    />
                  </q-btn-group>
                </q-td>
              </template>
            </q-table>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="routerRole" class="column no-wrap flex-center">
          <div class="q-mt-md text-center" style="width: 70vw; height: 75vh">
            <q-table
              :loading="loadingPermission"
              :rows="permissionData"
              :columns="router_columns"
              row-key="name"
              @request="fetchPermissionData"
              v-model:pagination="paginationPermission"
            >
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <q-badge
                    :color="loginStatusColor[props.value]"
                    outline
                    :label="loginStatus[props.value]"
                  />
                </q-td>
              </template>

              <template v-slot:body-cell-rolesOperation="props">
                <q-td :props="props" style="width: 800px">
                  <q-select
                    option-value="id"
                    option-label="comment"
                    options-dense
                    v-model="props.row.role_permissions"
                    :options="options"
                    label="权限选择"
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
                </q-td>
              </template>

              <template v-slot:body-cell-operation="props">
                <q-td :props="props">
                  <q-btn
                    size="sm"
                    color="primary"
                    @click="changePermission(props.row)"
                  >
                    提交更改
                  </q-btn>
                </q-td>
              </template>
            </q-table>
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="[
            { label: '管理员权限', value: 'adminRole' },
            { label: '身份路由权限', value: 'routerRole' }
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import {
  loginStatus,
  loginStatusColor,
  routerPermissionEnum
} from '../../utils/dict.js';
import {
  useRolesFetchData,
  useRouterPermissionFetchData
} from '../../composables/useRolesFetchData.js';
import store from '../../store/index.js';
import {
  blockedUser,
  changeRolePermission,
  forcedUserLogout,
  freeUser,
  userDownRole,
  userUpRole
} from '../../api/role.js';
import notify from '../../utils/notify.js';

const admin_columns = [
  {
    field: 'username',
    label: '用户名'
  },
  {
    field: row => row.admin_roles[0].comment,
    align: 'center',
    label: '身份'
  },
  {
    name: 'status',
    field: 'status',
    align: 'center',
    label: '登录状态'
  },
  {
    field: 'last_login_ip',
    label: '最后登陆地址'
  },
  {
    name: 'operation',
    field: 'operation',
    align: 'center',
    label: '操作'
  }
];
const router_columns = [
  {
    field: 'comment',
    align: 'center',
    label: '身份'
  },
  {
    name: 'rolesOperation',
    field: 'rolesOperation',
    align: 'center',
    label: '更改路由权限'
  },
  {
    name: 'operation',
    field: 'operation',
    align: 'center',
    label: '操作'
  }
];

const slide = ref('style');
const options = routerPermissionEnum;
const pagination = ref({
  page: 1,
  rowsPerPage: 10
});

const paginationPermission = ref({
  page: 1,
  rowsPerPage: 10
});

const downRole = id => {
  userDownRole(id).then(() => {
    notify.success('已降低该管理员权限！');
    fetchData();
  });
};
const upRole = id => {
  userUpRole(id).then(() => {
    notify.success('已提升该管理员权限！');
    fetchData();
  });
};

const forcedLogout = id => {
  forcedUserLogout(id).then(() => {
    notify.success('已强制下线该管理员！');
    fetchData();
  });
};
const blocked = id => {
  blockedUser(id).then(() => {
    notify.success('已封禁该管理员！');
    fetchData();
  });
};
const free = id => {
  freeUser(id).then(() => {
    notify.success('已解禁该管理员！');
    fetchData();
  });
};

const changePermission = row => {
  changeRolePermission(row.id, row.role_permissions).then(() => {
    notify.success('已改变身份路由！');
    fetchPermissionData();
  });
};

const userInfo = computed(() => store.getters['user/userInfo']);
const { roleData, fetchData, loadingRole } = useRolesFetchData(pagination);
const { permissionData, fetchPermissionData, loadingPermission } =
  useRouterPermissionFetchData(paginationPermission);
</script>

<style scoped lang="less"></style>
