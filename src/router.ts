import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './pages/home/home.vue';
import NotFound from './pages/not-found/not-found.vue';
import CountDown from './pages/count-down/count-down.vue';
import Login from './pages/login/login.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/count-down',
    name: 'contador',
    component: CountDown,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const isLoggedIn = !!localStorage.getItem('userId');

  if (to.meta.requiresAuth && !isLoggedIn) {
    return { path: '/login' };
  }

  if (to.meta.guestOnly && isLoggedIn) {
    return { path: '/' };
  }
});

export default router;