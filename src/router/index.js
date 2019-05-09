import Vue from 'vue';
import Router from '../assets/lib/vue-router.common';

/* layout*/
import Layout from '../views/layout/Layout';

/* login*/
import Login from '../views/login/';

// about
import about from '../views/about/about';
// feb-alive
import febAlive from 'feb-alive';
import RoleManage from '@sdx/view/components/role-manage';
import AuthorizeManage from '@sdx/view/components/authorize-manage';
febAlive.resetHistory();
Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 */
const router = new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({
        y: 0
    }),
    routes: [
        {
            path: '/login',
            component: Login,
            name: 'Login',
            hidden: true
        },
        {
            path: '/',
            redirct: '/home'
        },
        {
            path: '/home',
            component: Layout,
            name: 'Home',
            redirect: '/dashboard',
            meta: {
                breadcrumb: '首页'
            },
            hidden: true,
            children: [
                {
                    path: '/dashboard',
                    component: about,
                    name: 'About',
                    meta: {
                        name: '关于SkyDiscovery',
                        breadcrumb: '关于SkyDiscovery',
                        system: 'user'
                    }
                },
                {
                    path: '/resource',
                    component: about,
                    name: 'About',
                    meta: {
                        name: '资源管理',
                        breadcrumb: '资源管理',
                        system: 'manage'
                    }
                }
            ]
        }
    ]
});

RoleManage.viewRouter.register(router, '/home');
AuthorizeManage.viewRouter.register(router, '/home');
export default router;
