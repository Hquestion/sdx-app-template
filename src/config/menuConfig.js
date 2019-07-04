import permissions from './permissions';
// 首页 数据 项目 模型 服务 文件 镜像 用户 系统管理
const leftmenu = [
    {
        name: '首页',
        icon: 'iconfont iconicon-home',
        path: '/dashboard',
        auth: permissions.DASHBOARD_MENU_ACCESS
    },
    {
        name: '数据',
        icon: 'iconfont iconicon-data',
        path: '/datasManage',
        auth: permissions.DATA_MENU_ACCESS
    },
    {
        name: '项目',
        icon: 'iconfont iconicon-project',
        path: '/sdxv-project-manage',
        auth: permissions.PROJECT_MENU_ACCESS
    },
    {
        name: 'SkyFlow',
        icon: 'iconfont iconicon-Skyflow',
        path: '/sdxv-skyflow',
        auth: permissions.SKYFLOW_MENU_ACCESS
    },
    {
        name: '模型',
        icon: 'iconfont iconicon-model',
        path: '/sdxv-model-manage',
        auth: permissions.MODEL_MENU_ACCESS
    },
    {
        name: '资产管理',
        icon: 'iconfont iconicon-zichanguanli',
        children: [
            {
                name: '任务管理',
                path: '/sdxv-task-management',
                auth: permissions.PROJECT_MENU_ACCESS
            },
            {
                name: '文件管理',
                path: '/sdxv-file-manage',
                auth: permissions.FILE_MENU_ACCESS
            },
            {
                name: '镜像管理',
                path: '/sdxv-image-manage',
                auth: permissions.IMAGE_MENU_ACCESS
            }
        ]
    }
];

const manageMenus = [
    {
        name: '资源管理',
        icon: 'iconfont iconicon-ziyuanguanli1',
        path: '/sdxv-resource-manage',
        auth: permissions.RESOURCE_MENU_ACCESS
    },
    {
        name: '用户管理',
        icon: 'iconfont iconicon-yonghuguanli1',
        path: '/user',
        auth: permissions.USER_MENU_ACCESS,
        children: [
            {
                name: '用户',
                path: '/sdxv-user-manage'
            },
            {
                name: '用户组',
                path: '/sdxv-user-group'
            }
        ]
    },
    {
        name: '权限管理',
        icon: 'iconfont iconicon-quanxianguanli',
        path: '/rights',
        auth: permissions.PERMISSION_MENU_ACCESS,
        children: [
            {
                name: '授权',
                path: '/sdxv-authorize-manage'
            },
            {
                name: '权限',
                path: '/sdxv-privilege'
            },
            {
                name: '角色',
                path: '/sdxv-role-manage',
            }
        ]
    },
    {
        name: '监控中心',
        icon: 'iconfont iconicon-jiankongzhongxin1',
        auth: permissions.SYSTEM_MENU_ACCESS,
        path: '/monitor',
        children: [
            {
                name: '资源统计',
                path: '/sdxv-resource-statistics'
            },
            {
                name: '组件状态',
                path: '/sdxv-component-state'
            }
        ]
    },
];

export { leftmenu, manageMenus };
