import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './pages/home/home.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router;