import VueRouter from "vue-router";
import MainPage from "../pages/MainPage";
import BaseLayout from "../pages/BaseLayout";
import NotFound from "../pages/404";


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
                    path: '*',
                    name: 'notFound',
                    component: NotFound
                },
            ]
        }
    ]
})