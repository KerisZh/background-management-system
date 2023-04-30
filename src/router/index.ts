import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import Login from ' /components/login.vue'

const routes:Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import('@/components/login.vue'),
    alias: "/login"
  },
  {
    path: "/register",
    name: "register",
    component: () => import('@/view/register/Register.vue'),
  },
  {
    path: "/manage",
    name: "manage",
    component: () => import('@/layout/manager.vue'),
  },
  {
    path: "/info",
    name: "info",
    component: () => import('@/layout/user.vue'),
    alias: "/info"
  }
]

const router = createRouter({
  history: createWebHistory(), // createWebHistory 函数参数：路径基础路径和可选参数baseURL。如果没有给出baseURL，则默认为/ 
  routes
})  //create the instance of the main class.

export default  router