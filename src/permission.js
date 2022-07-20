import router from './router';
import { getCurrentRouter, getToken } from './utils/auth.js';
import { Notify } from 'quasar';
import store from './store/index.js';
import { activeRouter } from './router/activeRouter.js';

const whiteList = ['/login', '/403', '/404'];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  const hasRouter = getCurrentRouter();
  if (hasToken && hasRouter) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.state.user.status !== 2) {
        if (!store.state.user.routerMark) {
          activeRouter();
          next({ ...to, replace: true });
        } else {
          next();
        }
      } else {
        await store.dispatch('user/logout');
        Notify.create({
          type: 'negative',
          message: '你无权限访问后台',
          position: 'top'
        });
        next(`/login?redirect=${to.path}`);
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
