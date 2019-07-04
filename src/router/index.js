import Vue from 'vue';
import Router from '../assets/lib/vue-router.common';

/* layout*/
import Layout from '../views/layout/Layout';

/* login*/
import Login from '../views/login/';

//  dashboard
import Dashboard from '../views/dashboard/Index';
// about
import about from '../views/about/about';
// feb-alive
import febAlive from 'feb-alive';
// skyflow
import Editor from '../views/skyflow/editor/';

import RoleManage from '@sdx/view/lib/role-manage';
import AuthorizeManage from '@sdx/view/lib/authorize-manage';
import ProjectManage from '@sdx/view/lib/project-management';
import ModelManage from '@sdx/view/lib/model-manage';
import ImageManage from '@sdx/view/lib/image-management';
import SdxvPrivilege from '@sdx/view/lib/privilege';
import ResourceManageView from '@sdx/view/lib/resource-manage';
import UserManage from '@sdx/view/lib/user-manage';
import UserGroupManage from '@sdx/view/lib/user-group';
import TaskManagement from '@sdx/view/lib/task-management';
import ResourceStatistics from '@sdx/view/lib/resource-statistics';
import ComponentState from '@sdx/view/lib/component-state';

import Skyflow from '@sdx/view/lib/skyflow';
import FileManage from '@sdx/view/lib/file';

// datas
import datasManager from '../views/datas/index';
import datasList from '../views/datas/datasIndex';
import datasView from '../views/datas/datasView';
import DataSourceCreate from '../views/datamanagement/datasource/DataSourceCreate';
import CreateDataset from '../views/datamanagement/dataset-create/index';
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
    // mode: 'history', // 后端支持可开
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
                    component: Dashboard,
                    name: 'About',
                    meta: {
                        name: '关于SkyDiscovery',
                        breadcrumb: '关于SkyDiscovery',
                        system: 'user'
                    }
                },
                // 新的数据集
                {
                    path: '/datasManage',
                    component: datasManager,
                    redirect: '/datasManage/datasList',
                    meta: {
                        name: '数据'
                    },
                    children: [{
                        path: 'datasList',
                        component: datasList,
                        meta: {
                            name: '数据列表'
                        }
                    },
                    {
                        path: 'data-source-create/:id?/:read?',
                        component: DataSourceCreate,
                        name: 'CreateDataSource',
                        meta: {
                            name: '新建数据源'
                        },
                        props: true
                    },

                    // {
                    //     path: 'modifyService/:type',
                    //     component: formView,
                    //     meta: {
                    //         name: '编辑服务'
                    //     },
                    //     props: ({
                    //         params
                    //     }) => ({
                    //         formComp: forms[params.type]
                    //     })
                    // },
                    // {
                    //     path: 'modifyTask/:type/:taskId',
                    //     component: formView,
                    //     meta: {
                    //         name: '编辑任务'
                    //     },
                    //     props: ({
                    //         params
                    //     }) => ({
                    //         formComp: forms[params.type]
                    //     })
                    // },
                    // {
                    //     path: 'taskInfo/:type/:taskId',
                    //     component: formView,
                    //     meta: {
                    //         name: '任务详情'
                    //     },
                    //     props: ({
                    //         params
                    //     }) => ({
                    //         formComp: infos[params.type]
                    //     })
                    // },
                    {
                        path: 'dataView/',
                        component: datasView,
                        meta: {
                            name: '数据集预览'
                        },
                        props: true
                    },
                    {
                        path: 'create-dataset/:type',
                        component: CreateDataset,
                        meta: {
                            name: '创建数据集'
                        }
                    }
                    ]
                }
            ]
        },
        {
            path: '/assets',
            component: Layout,
            name: 'Assets',
            redirect: '/sdxv-task-management',
            meta: {
                breadcrumb: '资产管理'
            },
            hidden: true,
            children: [
            ]
        },
        {
            path: '/editor/:id/:executeId?',
            component: Editor,
            name: 'Editor',
            hidden: true
        }
    ]
});

ResourceManageView.viewRouter.register(router, '/home');
RoleManage.viewRouter.register(router, '/home');
AuthorizeManage.viewRouter.register(router, '/home');
ProjectManage.viewRouter.register(router, '/home');
ModelManage.viewRouter.register(router, '/home');
ImageManage.viewRouter.register(router, '/home');

Skyflow.viewRouter.register(router, '/home');
SdxvPrivilege.viewRouter.register(router, '/home');
UserManage.viewRouter.register(router, '/home');
UserGroupManage.viewRouter.register(router, '/home');
FileManage.viewRouter.register(router, '/assets');
TaskManagement.viewRouter.register(router, '/assets');
ResourceStatistics.viewRouter.register(router, '/home');
ComponentState.viewRouter.register(router, '/home');

export default router;
