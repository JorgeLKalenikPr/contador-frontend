import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './pages/home/home.vue';
import NotFound from './pages/not-found/not-found.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: Home
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
export default router;