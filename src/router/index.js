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
// import febAlive from 'feb-alive';
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
import SkyIDE from '@sdx/view/lib/sky-ide';

// datas
import datasManager from '../views/datas/index';
import datasList from '../views/datas/datasIndex';
import datasView from '../views/datas/datasView';
import DataSourceCreate from '../views/datamanagement/datasource/DataSourceCreate';
import CreateDataset from '../views/datamanagement/dataset-create/index';
import JupyterForm from '../views/datas/jupyterForm';
import jupyterloading from '../views/datas/jupyterloading';
import i18n from '../i18n';
// febAlive.resetHistory();
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
            path: '/jupyterurl/:id/:dataset',
            component: jupyterloading
        },
        {
            path: '/home',
            component: Layout,
            name: 'Home',
            redirect: '/dashboard',
            hidden: true,
            children: [
                {
                    path: '/dashboard',
                    component: Dashboard,
                    name: 'Dashboard',
                    meta: {
                        name: '',
                        breadcrumb: i18n.t('menu.Home'),
                        system: 'user',
                        isRoot: true
                    }
                },
                // 新的数据集
                {
                    path: '/datasManage',
                    name: 'DataManage',
                    component: datasManager,
                    redirect: '/datasManage/datasList',
                    meta: {
                        name: '数据',
                        breadcrumb: i18n.t('menu.Data'),
                        isRoot: true,
                        system: 'user'
                    },
                    children: [{
                        path: 'datasList',
                        name: 'DataList',
                        component: datasList,
                        meta: {
                            name: '数据列表',
                            breadcrumb: i18n.t('menu.Data'),
                            system: 'user',
                            isRoot: true
                        }
                    },
                    {
                        path: 'data-source-create/:id?/:read?',
                        component: DataSourceCreate,
                        name: 'CreateDataSource',
                        meta: {
                            name: '新建数据源',
                            breadcrumb: i18n.t('data.New_Data_Source'),
                            system: 'user'
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
                        name: 'DataPreview',
                        meta: {
                            name: '数据集预览',
                            breadcrumb: i18n.t('data.Dataset_Preview')
                        },
                        props: true
                    },
                    {
                        path: 'create-dataset/:type',
                        component: CreateDataset,
                        name: 'CreateDataset',
                        meta: {
                            name: '创建数据集',
                            breadcrumb: i18n.t('data.Create_dataset')
                        }
                    },
                    {
                        path: 'jupyter/:dataset',
                        component: JupyterForm,
                        name: 'JupyterForm',
                        meta: {
                            name: '新建Jupyter任务',
                            breadcrumb: i18n.t('data.New_Jupyter_Task')
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
SkyIDE.viewRouter.register(router);

export default router;
