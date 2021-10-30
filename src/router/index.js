import {createRouter, createWebHistory} from 'vue-router'
import SignUp from "../views/User/SignUp";
import SignIn from "../views/User/SignIn";
import GlobalTimeLine from "../views/Post/GlobalTimeLine";
import PostForm from "../views/Post/Form";

const routes = [
    {
        path: "/SignUp",
        component: SignUp,
        name: "sign up"
    },
    {
        path: "/SignIn",
        component: SignIn,
        name: "sign in"
    },
    {
        path: "/post/timeline",
        component: GlobalTimeLine,
        name: "GlobalTimeline"
    },
    {
        path: "/post/form",
        component: PostForm,
        name: "post Form"
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
