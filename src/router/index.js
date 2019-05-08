import Vue from 'vue';
import Router from 'vue-router';

/* layout*/
import Layout from '../views/layout/Layout';

/* login*/
import Login from '../views/login/';

// about
import about from '../views/about/about';
// feb-alive
import febAlive from 'feb-alive';
febAlive.resetHistory();
Vue.use(Router);

/**
 * icon : the icon show in the sidebar
 * hidden : if hidden:true will not show in the sidebar
 * redirect : if redirect:noredirect will not redirct in the levelbar
 * noDropdown : if noDropdown:true will not has submenu
 * meta : { role: ['admin'] }  will control the page role
 */
export default new Router({
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
            component: Layout,
            name: 'Home',
            redirect: '/home',
            meta: {
                breadcrumb: '首页'
            },
            hidden: true,
            children: [
                {
                    path: '/home',
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
