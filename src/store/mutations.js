const mutations = {
	setIsLogin(state, payload) {
		state.user.isLogin = payload;
	},

	setUser(state, payload) {
		// state.user.userId = payload.userId;
		// state.user.roleId = payload.roleId;
		// state.user.userIcon = payload.userIcon;
		// console.log('store.userId:'+state.user.userId);
		// console.log('store.userIcon:'+state.user.userIcon);
		// console.log('store.roleId:'+state.user.roleId);
		state.user = payload.user;
	},
};

export default mutations;