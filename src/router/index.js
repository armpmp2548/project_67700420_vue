import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import add_customer from '../views/Add_customer.vue'
import add_product from '../views/Add_product.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/showproduct',
    name: 'showproduct',
    component: () => import('../views/ShowProduct.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    component: () => import('../views/Customer.vue')
  },
  {
    path: '/Add_customer',
    name: 'Add_customer',
    component: add_customer
  },
  {
    path: '/products',
    name: 'product',
    component: () => import('../views/Product.vue')
  },
  {
    path: '/Add_product',
    name: 'Add_product',
    component: add_product
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
