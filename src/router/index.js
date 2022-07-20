import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '../pages/Layout.vue';

export const menuRoutes = [];
const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: 'index',
    children: menuRoutes
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
