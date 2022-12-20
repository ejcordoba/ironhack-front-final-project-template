import { createRouter, createWebHistory } from "vue-router";
import Auth from '../pages/Auth.vue'
import Dashboard from '../pages/Dashboard.vue'
const routes = [
  { path: '/', component: Dashboard },
  { path: '/auth', component: Auth },];
    

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
