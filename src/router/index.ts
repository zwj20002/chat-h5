// router - intex.ts
import { storeToRefs } from 'pinia'
import { loginStore } from '@/store/login'
// append import
import newsRoutes from './modules/newsRouter'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import('@/views/login/login.vue'),
    meta: { title: '登录', showNavbar: false },
    beforeEnter: (_to: any, _from: any, next: any) => {
      const store = loginStore()
      const { token } = storeToRefs(store)
      token.value ? next('/') : next()
    }
  },
  ...newsRoutes,
  // append new router
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router