import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin/Admin.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/Phyware.vue')
      },
      {
        path: '/changepwd',
        component: () => import('../views/ChangePwd.vue')
      },
      {
        path: '/user',
        component: () => import('../views/User.vue')
      },
      {
        path: '/phyware',
        component: () => import('../views/Phyware.vue')
      },
      {
        path: '/vmware',
        component: () => import('../views/Vmware.vue')
      },
      {
        path: '/resource',
        component: () => import('../views/Resource.vue')
      },
      {
        path: '/utilization',
        component: () => import('../views/Utilization.vue')
      }
    ]
  }
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
