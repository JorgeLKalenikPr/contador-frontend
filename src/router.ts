import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from './pages/home/home.vue';
import NotFound from './pages/not-found/not-found.vue';
import CountDown from './pages/count-down/count-down.vue';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'inicio',
    component: Home
  },
  {
    path: '/count-down',
    name: 'contador',
    component: CountDown
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