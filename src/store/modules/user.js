import {
  getCurrentRouter,
  getCurrentUser,
  getStatus,
  getToken,
  removeCurrentRouter,
  removeCurrentUser,
  removeStatus,
  removeToken,
  setCurrentRouter,
  setCurrentUser,
  setStatus,
  setToken
} from '../../utils/auth.js';
import { createToken } from '../../api/token.js';
import { changePassword, changeUserInfo, lgt, me } from '../../api/user.js';
import notify from '../../utils/notify.js';
import { ref } from 'vue';

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser(),
  status: getStatus(),
  router: getCurrentRouter(),
  routerMark: false
});

const getters = {
  nicknameFirstWord: state => {
    return state.currentUser && state.currentUser.nick_name
      ? state.currentUser.nick_name.slice(0, 1)
      : '';
  },
  userInfo: state => {
    return state.currentUser;
  }
};

const actions = {
  login({ commit }, { username, password }) {
    return new Promise((resolve, reject) => {
      let showValidCode = ref(false);
      createToken(username.trim(), password)
        .then(res => {
          showValidCode.value = false;
          resolve(showValidCode.value);
          commit('SET_STATUS', res.status);
          setStatus(res.status);
          commit('SET_TOKEN', res.token);
          setToken(res.token);
          commit('SET_ROUTER', res.router);
          setCurrentRouter(res.router);
        })
        .catch(error => {
          console.log(error);
          if (error.connt >= 2) {
            showValidCode.value = true;
          }
          resolve([showValidCode.value]);
          reject(error);
        });
    });
  },
  logout({ commit }) {
    lgt().then(userInfo => {
      if (userInfo.status !== 0) {
        commit('SET_TOKEN', '');
        commit('SET_CURRENT_USER', null);
        commit('SET_STATUS', '');
        commit('SET_ROUTER', null);
        removeToken();
        removeCurrentUser();
        removeStatus();
        removeCurrentRouter();
        window.location.reload();
      }
    });
  },
  changPassword({ commit }, { password, newPassword }) {
    // TODO 请重构修改密码后登出刷新页面
    return new Promise((resolve, reject) => {
      changePassword(password, newPassword)
        .then(ref => {
          notify.success(`用户${ref.username}密码修改成功！`);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  changUserInfo({ commit }, { username, nick_name, address, age, sex }) {
    return new Promise((resolve, reject) => {
      changeUserInfo(username, nick_name, address, age, sex)
        .then(ref => {
          notify.success(`用户${ref.username}信息更新成功！`);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      me()
        .then(currenUser => {
          commit('SET_CURRENT_USER', currenUser);
          setCurrentUser(currenUser);
          resolve(currenUser);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_CURRENT_USER: (state, currentUser) => {
    state.currentUser = currentUser;
  },
  SET_STATUS: (state, status) => {
    state.status = status;
  },
  SET_ROUTER: (state, currentRouter) => {
    state.router = currentRouter;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
