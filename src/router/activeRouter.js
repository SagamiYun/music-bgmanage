import Layout from '../pages/Layout.vue';
import router, { menuRoutes } from './index.js';
import { getCurrentRouter } from '../utils/auth.js';

export function activeRouter() {
  console.log(router.getRoutes());
  menuRoutes.push({
    path: 'test',
    name: 'Test',
    meta: { title: '主页', icon: 'home' },
    component: () => import('../pages/index/Index.vue')
  });
  router.addRoute('Layout', {
    path: 'test',
    name: 'Test',
    meta: { title: '主页', icon: 'home' },
    component: () => import('../pages/index/Index.vue')
  });
  router.addRoute({
    path: '/403',
    component: () => import('../pages/403.vue')
  });
  router.addRoute({
    path: '/:pathMatch(.*)',
    component: () => import('../pages/404.vue')
  });

  // const userStr = JSON.parse(sessionStorage.getItem('router'));
  // if (userStr) {
  //   let root = {
  //     path: '/',
  //     name: 'Layout',
  //     component: Layout,
  //     redirect: 'index',
  //     children: []
  //   };
  //   // console.log(useRoute().name);
  //   console.log(JSON.parse(sessionStorage.getItem('router')));
  //   const currentRouter = store.state.user.currentRouter;
  //   userStr.forEach(key => {
  //     root.children.push({
  //       path: key.path,
  //       name: key.name,
  //       meta: { title: key.comment, icon: key.icon },
  //       component: () => import(`../pages/${key.path}/Index.vue`)
  //     });
  //   });
  // userStr.foreach(key => {
  //   root.children.push({
  //     path: key.path,
  //     name: key.name,
  //     meta: { title: key.comment, icon: key.icon },
  //     component: () => import(`./pages/${key.path}/Index.vue`)
  //   });
  // });
  // router.addRoute(root);
  // }
}
