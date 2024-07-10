export default [
  {
    path: '/',
    name: 'verification',
    meta: {
      title: '身份验证',
      requiresAuth: true
    },
    component: () => import('../views/verification/index.vue')
  },
  {
    path: '/wageList',
    name: 'wageList',
    meta: {
      title: '工资查询',
      requiresAuth: true
    },
    component: () => import('../views/wageList/index.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   requiresAuth: true,
  //   // route level code-splitting
  //   // this generates a separate chunk (About.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
]
