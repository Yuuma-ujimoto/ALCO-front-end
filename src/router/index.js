import {createRouter, createWebHistory} from 'vue-router'
import Store from "../store/index";
import SignUp from "../views/User/SignUp";
import SignIn from "../views/User/SignIn";
import GlobalTimeLine from "../views/Post/GlobalTimeLine";
import PostForm from "../views/Post/Form";
import PostUser from "../views/Post/UserPage"
import ArticleFrom from "../views/Article/Form"

const routes = [
    {
        path: "/SignUp",
        component: SignUp,
        name: "sign up",
    },
    {
        path: "/SignIn",
        component: SignIn,
        name: "sign in",
    },
    {
        path: "/post/timeline",
        component: GlobalTimeLine,
        name: "GlobalTimeline",
        meta:{requiresAuth:true}
    },
    {
        path: "/post/form",
        component: PostForm,
        name: "post Form",
        meta:{requiresAuth:true}
    },
    {
        path: "/post/user/:UserId",
        component: PostUser,
        name: "post user",
        meta:{requiresAuth:true}
    },
    {
        path: "/article/form",
        component: ArticleFrom,
        name :"article form",
        meta:{requiresAuth:true}
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async (to, from, next) => {
//    await Store.dispatch("resetToast")
    if (to.matched.some(record => record.meta.requiresAuth) && !Store.getters.isLogin) {
    //await Store.dispatch("addToast", {message: "ログインしていないユーザーはこのページにアクセスできません。", type: "Alert"})
        next({path: "/"})
        return
    }
    next()
})

export default router
