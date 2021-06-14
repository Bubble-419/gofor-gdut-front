import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'show-echart',
    component: () => import('views/backstage/show-echart.vue')
  },
  {
    path:'/OrderList',
    name:'OrderList',
    component:() => import('views/backstage/OrderList.vue')
  },
  {
    path: '/UsersList',
    name:'UsersList',
    component:() => import('views/backstage/UsersList.vue')
  },
  {
    path:'/show-echart',
    name:'show-echart',
    component:() => import('views/backstage/show-echart.vue')
  },
  {
    path:'/ComplainCase',
    name:'ComplainCase',
    component:() => import('views/backstage/ComplainCase.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
