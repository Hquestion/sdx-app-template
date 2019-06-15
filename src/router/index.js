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

import RoleManage from '@sdx/view/lib/role-manage';
import AuthorizeManage from '@sdx/view/lib/authorize-manage';
import ProjectManage from '@sdx/view/lib/project-management';
import ImageManage from '@sdx/view/components/image-management';
import SdxvPrivilege from '@sdx/view/lib/privilege';
import ResourceManageView from '@sdx/view/components/resource-manage';
import UserManage from '@sdx/view/components/user-manage';
import UserGroupManage from '@sdx/view/lib/user-group';
import FileManage from '@sdx/view/components/file';

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
            redirect: '/home'
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
                }
            ]
        },
        {
            path: '/assets',
            component: Layout,
            name: 'Assets',
            meta: {
                breadcrumb: '资产管理'
            },
            hidden: true,
            children: [
            ]
        }
    ]
});

ResourceManageView.viewRouter.register(router, '/home');
RoleManage.viewRouter.register(router, '/home');
AuthorizeManage.viewRouter.register(router, '/home');
ProjectManage.viewRouter.register(router, '/home');
ImageManage.viewRouter.register(router, '/assets');
SdxvPrivilege.viewRouter.register(router, '/home');
UserManage.viewRouter.register(router, '/home');
UserGroupManage.viewRouter.register(router, '/home');
FileManage.viewRouter.register(router, '/assets');

export default router;
