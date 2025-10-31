import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import add_customer from '../views/Add_customer.vue'
import add_product from '../views/Add_product.vue'
import add_student from '../views/Add_student.vue'
import customer_edit from '../views/customer_edit.vue'
import employees from '../views/employees.vue'






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
    path: '/employees',
    name: 'employees',
    component: employees
  },
  {
    path: '/student_edit',
    name: 'student_edit',
    component: () => import('../views/Student_edit.vue')
  },
  {
    path: '/login_customer',
    name: 'login_customer',
    component: () => import('../views/Login_customer.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 🧠 Navigation Guard — ตรวจสอบการเข้าสู่ระบบ
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("customerLogin") === "true";

  // ถ้าหน้านั้นต้องล็อกอินก่อน แต่ยังไม่ได้ล็อกอิน
  if (to.meta.requiresAuth && !isLoggedIn) {
    alert("⚠ กรุณาเข้าสู่ระบบก่อนใช้งานหน้านี้");
    next("/login_customer");
  }
  // ถ้าเข้าสู่ระบบแล้วแต่พยายามกลับไปหน้า login อีก → ส่งกลับหน้าแรก
  else if (to.path === "/login" && isLoggedIn) {
    next("/showproduct");
  } 
  // อื่น ๆ ไปต่อได้ตามปกติ
  else {
    next();
  }
});



export default router
