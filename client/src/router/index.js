import VueRouter from "vue-router";
import MainPage from "../pages/MainPage";
import BaseLayout from "../pages/BaseLayout";
import NotFound from "../pages/404";
import UserPage from "../pages/UserPage";


export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'layout',
            component: BaseLayout,
            children: [
                {
                    path: '',
                    name: 'main',
                    component: MainPage
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