import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/DashBoard',
    name: 'DashBoard',
    component: () => import('../views/DashBoard.vue'),
    children: [
      {
        path: 'Products',
        name: 'Products',
        component: () => import('../views/Products.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
