import {
  createStore
} from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

const state = {
  user: {
    isLogin: window.localStorage.getItem('token') ? true : false,
    userId: 2,
    username: '',
    roleId: 0,
    userIcon: '',
  },
  orderCategory: [{
      name: "帮拿外卖",
      id: 1
    },
    {
      name: "帮取快递",
      id: 2
    },
    {
      name: "饭堂打包",
      id: 3
    },
    {
      name: "帮忙打印",
      id: 4
    },
    {
      name: "帮带物品",
      id: 5
    },
    {
      name: "其他",
      id: 6
    }
  ],
  orderStatus: [{
      id: 0,
      label: "未接单"
    },
    {
      id: 1,
      label: "已接单"
    },
    {
      id: 2,
      label: "待评价"
    },
    {
      id: 3,
      label: "已评价"
    },
    {
      id: 4,
      label: "已取消"
    },
  ],
  positions: [{
      label: "大学城校区",
      value: "大学城校区",
    },
    {
      label: "龙洞校区",
      value: "龙洞校区",
    },
    {
      label: "东风路校区",
      value: "东风路校区",
    },
  ]
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})