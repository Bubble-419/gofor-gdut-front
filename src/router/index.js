import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

import store from '@/store/index.js'

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home/Home.vue'),
  }, {
    path: '/bsIndex',
    name: 'bsIndex',
    component: () => import('views/backstage/bsIndex.vue'),
    children: [{
        path: '/OrderList',
        name: 'OrderList',
        component: () => import('views/backstage/OrderList.vue')
      },
      {
        path: '/UsersList',
        name: 'UsersList',
        component: () => import('views/backstage/UsersList.vue')
      },
      {
        path: '/show-echart',
        name: 'show-echart',
        component: () => import('views/backstage/show-echart.vue')
      },
      {
        path: '/ComplainCase',
        name: 'ComplainCase',
        component: () => import('views/backstage/ComplainCase.vue')
      }
    ]
  },
  {
    path: '/login',
    name: "LoginPage",
    component: () => import('views/login/LoginPage.vue'),
    meta: {
      title: 'gdut-gofor | 登录'
    }
  },
  {
    path: '/publish',
    name: 'PublishOrder',
    component: () => import('views/PublishOrder.vue'),
    meta: {
      requiresAuth: true,
      title: 'gdut-gofor | 发布订单'
    },
  },
  {
    path: '/orders/detail/:orderId(\\d+)',
    name: 'Detail',
    component: () => import('views/Detail.vue'),
    meta: {
      requiresAuth: true,
      title: 'gdut-gofor | 订单详情'
    },
  }, {
    path: '/orders/update/:orderId(\\d+)',
    name: 'UpdateOrder',
    component: () => import('views/UpdateOrder.vue'),
    meta: {
      requiresAuth: true,
      title: 'gdut-gofor | 修改订单详情'
    },
  },
  {
    path: '/center',
    name: 'UserCenter',
    component: () => import('views/user-center/UserCenter.vue'),
    meta: {
      requiresAuth: true,
      title: 'gdut-gofor | 个人中心页'
    },
    children: [{
        path: '/userinfo',
        name: 'UserInfo',
        component: () => import('views/user-center/UserInfo.vue'),
        props: {
          user: false
        }
      },
      {
        path: '/my-received',
        name: 'MyReceived',
        component: () => import('views/user-center/MyReceived.vue'),
      }, {
        path: '/my-published',
        name: 'MyPublished',
        component: () => import('views/user-center/MyPublished.vue'),
      }, {
        path: '/history',
        name: 'MyHistory',
        component: () => import('views/user-center/MyHistory.vue'),
      }, {
        path: '/security',
        name: 'Security',
        component: () => import('views/user-center/Security.vue'),
      }, {
        path: '/complain',
        name: 'Complain',
        component: () => import('views/user-center/Complain.vue'),
      }
    ]
  },
  {
    path: '/search/:keywords',
    name: "SearchResult",
    component: () => import('views/SearchResult.vue'),
    meta: {
      title: 'gdut-gofor | 搜索结果'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.isLogin) {
    next({
      name: 'LoginPage'
    })
  } else {
    next();
  }
});

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    next();
  } else {
    document.title = 'gdut-gofor | 广工人的跑腿系统';
    next();
  }
})

export default router