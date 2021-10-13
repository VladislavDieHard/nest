import VueRouter from "vue-router";
import MainPage from "../pages/MainPage";
import BaseLayout from "../pages/BaseLayout";
import NotFound from "../pages/404";
import UserPage from "../pages/UserPage";
import RegisterPage from "../pages/RegisterPage";
import PostCreatePage from "../pages/PostCreatePage";
import store from "../store";


export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '',
            component: BaseLayout,
            children: [
                {
                    path: '',
                    name: 'main',
                    component: MainPage
                },
                {
                    path: 'register',
                    name: 'register',
                    component: RegisterPage,
                    beforeEnter: (to, from, next) => {
                        if (store.state.auth.authorized) {
                            next({name: 'main'});
                        } else {
                            next();
                        }
                    }
                },
                {
                    path: 'post',
                    name: 'post',
                    component: PostCreatePage
                },
                {
                    path: 'user/:id',
                    name: 'userPage',
                    component: UserPage
                },
                {
                    path: '*',
                    name: 'notFound',
                    component: NotFound
                }
            ]
        },
    ]
})