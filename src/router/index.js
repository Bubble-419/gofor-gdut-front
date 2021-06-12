import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

// import store from '@/store/index.js'

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('views/home/Home.vue'),
  },
  {
    path: '/login',
    name: "LoginPage",
    component: () => import('views/login/LoginPage.vue'),
  },
  {
    path: '/publish',
    name: 'PublishOrder',
    component: () => import('views/PublishOrder.vue'),
  },
  {
    path: '/orders/detail/:orderId',
    name: 'Detail',
    component: () => import('views/Detail.vue'),
  },
  {
    path: '/center',
    name: 'UserCenter',
    component: () => import('views/user-center/UserCenter.vue'),
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.path == '/' || to.path == '/home' || to.path == '/login') {
//     next();
//   } else {
//     if (!store.state.user.isLogin) {
//       next({
//         path: '/login'
//       });
//     } else {
//       next();
//     }
//   }
// });

export default router