// 首页 数据 项目 模型 服务 文件 镜像 用户 系统管理
const leftmenu = [
    {
        name: '首页',
        icon: 'iconfont iconicon-home-selected',
        path: '/home'
    },
    {
        name: '数据',
        icon: 'iconfont iconicon-data',
        path: '/datasManage'
    },
    {
        name: '项目',
        icon: 'iconfont iconicon-project',
        path: '/projectManage'
    },
    {
        name: 'SkyFlow',
        icon: 'iconfont iconicon-Skyflow',
        path: '/skyflow'
    },
    {
        name: '模型',
        icon: 'iconfont iconicon-model',
        path: '/skyflow'
    },
    {
        name: '资产管理',
        icon: 'iconfont iconicon-zichanguanli',
        path: '',
        children: [
            {
                name: '我的任务',
                path: '/taskResource'
            },
            {
                name: '我的文件',
                path: '/filemanage'
            },
            {
                name: '我的模型',
                path: '/modelManage'
            },
            {
                name: '我的镜像',
                path: '/imageManage'
            }
        ]
    }
];

const manageMenus = [
    {
        name: '资源管理',
        icon: 'iconfont iconicon-zichanguanli',
        path: '/resource'
    },
    {
        name: '用户管理',
        icon: 'iconfont iconicon-zichanguanli',
        path: '/user',
        children: [
            {
                name: '用户',
                path: '/taskResource'
            },
            {
                name: '用户组',
                path: '/filemanage'
            }
        ]
    },
    {
        name: '权限管理',
        icon: 'iconfont iconicon-zichanguanli',
        path: '/rights',
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
        icon: 'iconfont iconicon-zichanguanli',
        path: '/home'
    },
];

export { leftmenu, manageMenus };
