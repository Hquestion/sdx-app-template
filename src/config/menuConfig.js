import permissions from './permissions';
import i18n from '../i18n';
// 首页 数据 项目 模型 服务 文件 镜像 用户 系统管理
const leftmenu = [
    {
        name: i18n.t('menu.Home'),
        icon: 'iconfont iconshouyeICON',
        activeIcon: 'iconfont iconicon-home-selected',
        path: '/dashboard',
        auth: permissions.DASHBOARD_MENU_ACCESS
    },
    {
        name: i18n.t('menu.Data'),
        icon: 'iconfont iconshujuICON',
        activeIcon: 'iconfont iconicon-data-selected',
        path: '/datasManage',
        auth: permissions.DATA_MENU_ACCESS
    },
    {
        name: i18n.t('menu.DevPlatform'),
        icon: 'iconfont iconkaifagongzuotaiICON',
        path: '/sdxv-dev-platform'
    },
    /* {
        name: '项目管理 - old',
        icon: 'iconfont iconicon-project',
        activeIcon: 'iconfont iconicon-project-selected',
        path: '/sdxv-project-manage',
        auth: permissions.PROJECT_MENU_ACCESS
    }, */
    {
        name: i18n.t('menu.SkyFlow'),
        icon: 'iconfont iconSkyflowIOCN',
        activeIcon: 'iconfont iconicon-Skyflow-selected',
        path: '/sdxv-skyflow',
        auth: permissions.SKYFLOW_MENU_ACCESS
    },
    {
        name: i18n.t('menu.Model'),
        icon: 'iconfont iconmoxingICON',
        activeIcon: 'iconfont iconicon-model-selected',
        path: '/sdxv-model-manage-next',
        auth: permissions.MODEL_MENU_ACCESS,
        children: [
            {
                name: i18n.t('menu.ModelWarehouse'),
                path: '/sdxv-model-manage-next/modelList',
            },
            {
                name: i18n.t('menu.ServiceList'),
                path: '/sdxv-model-manage-service',
            },
        ]
    },
    {
        name: i18n.t('menu.AIPlatform'),
        icon: 'iconfont iconAIkaifazhepingtaiICON',
        activeIcon: 'iconfont iconicon-project-selected',
        path: '/sdxv-project-manage',
        auth: permissions.PROJECT_MENU_ACCESS
    },
    {
        name: i18n.t('menu.ProjectManage'),
        icon: 'iconfont iconxiangmuguanliICON',
        activeIcon: 'iconfont iconicon-project-selected',
        path: '/sdxv-project-manage-next',
        auth: permissions.PROJECT_MENU_ACCESS
    },
    {
        name: i18n.t('menu.AssetsManage'),
        icon: 'iconfont iconzichanguanliICON',
        activeIcon: 'iconfont iconicon-zichanguanli-selected',
        path: '/sdxv-task-management',
        children: [
            {
                name: i18n.t('menu.TaskManage'),
                path: '/sdxv-task-management',
                auth: permissions.PROJECT_MENU_ACCESS
            },
            {
                name: i18n.t('menu.FileManage'),
                path: '/sdxv-file-manage',
                auth: permissions.FILE_MENU_ACCESS
            },
            {
                name: i18n.t('menu.ImageManage'),
                path: '/sdxv-image-manage',
                auth: permissions.IMAGE_MENU_ACCESS
            }
        ]
    },
    {
        name: i18n.t('menu.Setting'),
        icon: 'iconfont iconxitongshezhiICON',
        activeIcon: 'iconfont iconicon-project-selected',
        path: '/sdxv-project-manage',
        auth: permissions.PROJECT_MENU_ACCESS
    },
];

const manageMenus = [
    {
        name: i18n.t('menu.ResourceManage'),
        icon: 'iconfont iconicon-ziyuanguanli1',
        activeIcon: 'iconfont iconicon-ziyuanguanli-selected1',
        path: '/sdxv-resource-manage',
        auth: permissions.RESOURCE_MENU_ACCESS
    },
    {
        name: i18n.t('menu.UserManage'),
        icon: 'iconfont iconicon-yonghuguanli1',
        activeIcon: 'iconfont iconicon-yonghuguanli-selected',
        path: '/user',
        auth: permissions.USER_MENU_ACCESS,
        children: [
            {
                name: i18n.t('menu.User'),
                path: '/sdxv-user-manage'
            },
            {
                name: i18n.t('menu.UserGroup'),
                path: '/sdxv-user-group'
            }
        ]
    },
    {
        name: i18n.t('menu.Permission'),
        icon: 'iconfont iconicon-quanxianguanli',
        activeIcon: 'iconfont iconicon-quanxianguanli-selected1',
        path: '/rights',
        auth: permissions.PERMISSION_MENU_ACCESS,
        children: [
            {
                name: i18n.t('menu.Authorization'),
                path: '/sdxv-authorize-manage'
            },
            {
                name: i18n.t('menu.Permission'),
                path: '/sdxv-privilege'
            },
            {
                name: i18n.t('menu.Role'),
                path: '/sdxv-role-manage',
            }
        ]
    },
    {
        name: i18n.t('menu.MonitoringCenter'),
        icon: 'iconfont iconicon-jiankongzhongxin1',
        activeIcon: 'iconfont iconicon-jiankongzhongxin-selected1',
        auth: permissions.SYSTEM_MENU_ACCESS,
        path: '/monitor',
        children: [
            {
                name: i18n.t('menu.ResourceStatics'),
                path: '/sdxv-resource-statistics'
            },
            {
                name: i18n.t('menu.ComponentState'),
                path: '/sdxv-component-state'
            },
            {
                name: i18n.t('menu.TaskManage'),
                path: '/sdxv-task-manage-platform'
            }
        ]
    },
];

export { leftmenu, manageMenus };
