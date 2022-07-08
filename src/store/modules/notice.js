import { getCurrentUser, getToken, setCurrentUser } from '../../utils/auth.js';
import { me } from '../../api/user.js';
import { pushList } from '../../api/notice.js';

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
  fetchPushNotice({ commit }) {
    return new Promise((resolve, reject) => {
      pushList().then(pushListInfo => {
        resolve(pushListInfo);
      });
    });
  }
};
