const whiteList = ['/login', '/register'] // 白名单路径数组
export function permissions(router) {
  // 全局路由守卫
  router.beforeEach((to, from, next) => {
    if (whiteList.includes(to.path)) {
      // 如果在白名单中，直接放行
      next()
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      // 如果需要身份验证
      next()
    } else {
      alert('请先登录')
      next('/login')
    }
  })
}
