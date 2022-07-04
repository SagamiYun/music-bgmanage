import {
  getCurrentUser,
  getToken,
  removeCurrentUser,
  removeToken,
  setCurrentUser,
  setToken
} from '../../utils/auth.js';
import { createToken } from '../../api/token.js';
import { changePassword, changeUserInfo, lgt, me } from '../../api/user.js';
import notify from '../../utils/notify.js';

const state = () => ({
  token: getToken(),
  currentUser: getCurrentUser()
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
      createToken(username.trim(), password)
        .then(token => {
          commit('SET_TOKEN', token);
          setToken(token);
          resolve();
        })
        // TODO 请重构刷新页面后的显示参数
        // .catch(connt => {
        //   this.connt = connt;
        //   window.location.reload();
        // })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout({ commit }) {
    lgt().then(userInfo => {
      if (userInfo.status === 1) {
        commit('SET_TOKEN', '');
        commit('SET_CURRENT_USER', null);
        removeToken();
        removeCurrentUser();
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
