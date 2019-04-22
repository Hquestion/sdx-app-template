/**
 * Created by wdh on 2017/7/7.
 */

// 首页 数据 项目 模型 服务 文件 镜像 用户 系统管理
const leftmenu = [{
    name: '首页',
    icon: 'iconfont icon-xiazai44',
    path: '/home'
},
// {
//     name: '数据',
//     icon: 'iconfont icon-ico_yy',
//     path: '/dataManagement'
// },
{
    name: '数据',
    icon: 'iconfont icon-07_tongjifenxi',
    path: '/datasManage'
},
{
    name: '项目',
    icon: 'iconfont icon-02',
    path: '/projectManage'
},
{
    name: 'SkyFlow',
    icon: 'iconfont icon-SKYFLOW',
    path: '/skyflow'
},
{
    name: '资产管理',
    icon: 'iconfont icon-guanli',
    path: '',
    children: [{
        name: '我的任务',
        // icon: 'iconfont icon-ico_renwu',
        path: '/taskResource'
    },
    {
        name: '我的文件',
        // icon: 'iconfont icon-ico_wj',
        path: '/filemanage'
    },
    {
        name: '我的模型',
        // icon: 'iconfont icon-ico_model',
        path: '/modelManage'
    },
    {
        name: '我的镜像',
        // icon: 'icon-ico_mirror iconfont',
        path: '/imageManage'
    }
    ]
},
// {
//     name: '服务',
//     icon: 'iconfont icon-ico_severice',
//     path: '/serviceManage'
// },
{
    name: '用户管理',
    icon: 'iconfont icon-wulumuqishigongandashujuguanlipingtai-ico-',
    path: '/usermanage'
    // },
    // {
    //     name: '系统监控',
    //     icon: 'iconfont icon-business_monitor',
    //     path: '/sourcemanage'
}
];

export default leftmenu;
