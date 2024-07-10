import { createRouter, createWebHistory } from 'vue-router'
import { permissions } from './permissions.js'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes
})

// 设置路由拦截
permissions(router)
export default router
