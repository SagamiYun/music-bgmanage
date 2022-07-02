import { createRouter, createWebHashHistory } from 'vue-router';

import Layout from '../pages/Layout.vue';

export const menuRoutes = [
  {
    path: 'index',
    name: 'Index',
    meta: { title: '主页', icon: 'home' },
    component: () => import('../pages/index/Index.vue')
  },
  {
    path: 'statistics',
    name: 'Statistics',
    meta: { title: '信息统计', icon: 'bar_chart' },
    component: () => import('../pages/statistics/Index.vue')
  },
  {
    path: 'dashboard',
    name: 'Dashboard',
    meta: { title: '控制台', icon: 'dashboard' },
    component: () => import('../pages/dashboard/Index.vue')
  },
  {
    path: 'user',
    name: 'User',
    meta: { title: '管理员管理', icon: 'manage_accounts' },
    component: () => import('../pages/user/Index.vue')
  },
  {
    path: 'music_user',
    name: 'MusicUser',
    meta: { title: '用户管理', icon: 'person' },
    component: () => import('../pages/music_user/Index.vue')
  },
  {
    path: 'music',
    name: 'Music',
    meta: { title: '歌曲管理', icon: 'music_note' },
    component: () => import('../pages/music/Index.vue')
  },
  {
    path: 'artist',
    name: 'Artist',
    meta: { title: '艺术家管理', icon: 'face_2' },
    component: () => import('../pages/artist/Index.vue')
  },
  {
    path: 'song_sheet',
    name: 'SongSheet',
    meta: { title: '歌单管理', icon: 'library_music' },
    component: () => import('../pages/song_sheet/Index.vue')
  },
  {
    path: 'album',
    name: 'Album',
    meta: { title: '专辑管理', icon: 'album' },
    component: () => import('../pages/album/Index.vue')
  },
  {
    path: 'comment',
    name: 'Comment',
    meta: { title: '评论管理', icon: 'textsms' },
    component: () => import('../pages/comment/Index.vue')
  },
  {
    path: 'changePassword',
    name: 'ChangePassword',
    meta: { title: '评论管理', icon: 'textsms' },
    component: () => import('../pages/ChangePassword.vue')
  },
  {
    path: 'role',
    name: 'Role',
    meta: { title: '权限管理', icon: 'lock' },
    component: () => import('../pages/role/Index.vue')
  }
];
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: 'index',
    children: menuRoutes
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue')
  },
  {
    path: '/403',
    component: () => import('../pages/403.vue')
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../pages/404.vue')
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;
