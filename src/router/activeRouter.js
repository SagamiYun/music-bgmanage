import Layout from '../pages/Layout.vue';
import router, { menuRoutes } from './index.js';
import { getCurrentRouter } from '../utils/auth.js';
import store from '../store/index.js';

export function activeRouter() {
  const currentRouter = getCurrentRouter();
  currentRouter.forEach(p => {
    if (p.icon !== null) {
      menuRoutes.push({
        path: p.path,
        name: p.name,
        meta: { title: p.comment, icon: p.icon },
        component: () => import(`../pages/${p.path}/Index.vue`)
      });
      router.addRoute('Layout', {
        path: p.path,
        name: p.name,
        meta: { title: p.comment, icon: p.icon },
        component: () => import(`../pages/${p.path}/Index.vue`)
      });
    }
  });
  router.addRoute('Layout', {
    path: 'changePassword',
    name: 'ChangePassword',
    meta: { title: '修改密码' },
    component: () => import('../pages/ChangePassword.vue')
  });
  router.addRoute('Layout', {
    path: 'changeUserInfo',
    name: 'ChangeUserInfo',
    meta: { title: '修改个人信息' },
    component: () => import('../pages/ChangeUserInfo.vue')
  });
  router.addRoute({
    path: '/403',
    component: () => import('../pages/403.vue')
  });
  router.addRoute({
    path: '/:pathMatch(.*)',
    component: () => import('../pages/404.vue')
  });
  store.state.user.routerMark = true;
}
