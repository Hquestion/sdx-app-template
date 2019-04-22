import Vue from 'vue';
import Router from 'vue-router';

/* layout*/
import Layout from '../views/layout/Layout';

/* login*/
import Login from '../views/login/';

// about
import about from '../views/about/about';

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
            hidden: true
        },
        {
            path: '/',
            component: Layout,
            redirect: '/home',
            meta: {},
            hidden: true,
            children: [
                {
                    path: '/home',
                    component: about,
                    meta: {
                        name: '关于SkyDiscovery'
                    }
                }
            ]
        }
    ]
});
