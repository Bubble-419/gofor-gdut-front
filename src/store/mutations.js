const mutations = {
  setIsLogin(state, payload) {
    state.user.isLogin = payload;
  },

  setUser(state, payload) {
    state.user.userId = payload.userId;
    state.user.roleId = payload.roleId;
    state.user.userIcon = payload.userIcon;
  },
};

export default mutations;