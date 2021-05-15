import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue')
  },
   {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue')
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Home' && to.name !== 'SignUp')
    if (!localStorage.getItem('token'))
    next({ name: 'Home'})
    next()
})

export default router