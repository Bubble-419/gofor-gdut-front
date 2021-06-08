import {
  createStore
} from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

const state = {
  user: {
    isLogin: window.localStorage.getItem('token') ? true : false,
    roleId: 0,
    userIcon:'',
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})