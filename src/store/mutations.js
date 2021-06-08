const mutations = {
  setUser(state, payload) {
    state.user.isLogin = payload.isLogin;
    state.user.roleId = payload.roleId;
    state.user.userIcon = payload.userIcon;
  },
};

export default mutations;