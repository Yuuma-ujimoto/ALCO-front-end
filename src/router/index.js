import { createRouter, createWebHistory } from 'vue-router'
import SignUp from "../views/User/SignUp";
import SignIn from "../views/User/SignIn";

const routes = [
  {
    path:"/SignUp",
    component:SignUp,
    name:"sign up"
  },
  {
    path:"/SignIn",
    component:SignIn,
    name:"sign in"
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
