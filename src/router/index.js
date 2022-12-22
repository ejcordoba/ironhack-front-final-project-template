import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../pages/Dashboard.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'

const routes = [
  { path: '/', name: "Dashboard",component: Dashboard },
  { path: '/login', name: "Login", component: Login },
  { path: '/register', name: "Register", component: Register },

];    

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
