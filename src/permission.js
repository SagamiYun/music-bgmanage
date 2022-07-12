import router from './router';
import { getToken } from './utils/auth.js';
import { Notify } from 'quasar';
import store from './store/index.js';

const whiteList = ['/login', '/403', '/404'];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (store.state.user.currentUser.status !== 2) {
        next();
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
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
