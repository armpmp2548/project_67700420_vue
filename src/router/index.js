import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import add_customer from '../views/Add_customer.vue'
import add_product from '../views/Add_product.vue'
import add_student from '../views/Add_student.vue'
import customer_edit from '../views/customer_edit.vue'





const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
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

  {
    path: '/Add_Student',
    name: 'Add_Student',
    component: add_student
  },
  {
    path: '/customer_edit',
    name: 'customer_edit',
    component: customer_edit
  },
  {
    path: '/student_edit',
    name: 'student_edit',
    component: () => import('../views/Student_edit.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
