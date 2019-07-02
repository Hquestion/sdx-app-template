// @flow
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import 'styles/app.scss'; // 全局自定义的css样式
import 'components/Icon-svg/index'; // 封装的svg组件
import 'assets/fonts/icon/iconfont.js'; // iconfont (从iconfont里面打包来的)
import 'assets/fonts/skyflow/iconfont.js'; // iconfont (从iconfont里面打包来的)
import * as filters from './filters'; // 全局vue filter
import errLog from 'store/errLog'; // error log组件f
import 'assets/fonts/icon/iconfont.css'; // 引入自己下载的iconfont
import 'assets/fonts/skyflow/iconfont.css'; // 引入自己下载的iconfont
import EmitAsync from './plugins/asyncEmit';
import directives from '@/directives';
import i18n from './i18n';
import SdxUI from '@sdx/ui';
import { FileSelect, Breadcrumb, ResourceConfig } from '@sdx/widget';
import Auth from '@sdx/widget/lib/auth';
import shareCenter from '@sdx/utils/lib/helper/shareCenter';
import febAlive from 'feb-alive';

Vue.use(febAlive, { router, keyName: 'feb' });
Vue.use(EmitAsync);

console.log(SdxUI);

// import directives by shaojs 2018年 2月22日 星期四 17时11分29秒 CST

Vue.use(directives);
// register globally
Vue.use(ElementUI);
Vue.use(SdxUI);
Vue.use(FileSelect);
Vue.use(Breadcrumb);
Vue.use(ResourceConfig);
Vue.use(Auth);
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

shareCenter.setup({
    user() {
        const user = store.state.user.token;
        user && (user.user.allPermissions = [
            // MENU
            { key: 'APPLICATION:DASHBOARD_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:DATA_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:PROJECT_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:SKYFLOW_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:MODEL_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:FILE_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:IMAGE_MANAGER_MENU:ACCESS:', tags: ['MENU'] },

            // MENU - MANAGER PLATFORM
            { key: 'APPLICATION:MANAEGR_PLATFORM_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:USER_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:PERMISSION_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:RESOURCE_MANAGER_MENU:ACCESS:', tags: ['MENU'] },
            { key: 'APPLICATION:SYSTEM_MANAGER_MENU:ACCESS:', tags: ['MENU'] },

            // APPLICATION
            { key: 'APPLICATION:GLOBAL_IMAGE_BUTTON:ACCESS:', tags: ['BUTTON'] },


            // RESOURCE MANAGER
            { key: 'RESOURCE-MANAGER:TEMPLATE:READ:', tags: ['BUTTON'] },
            { key: 'RESOURCE-MANAGER:TEMPLATE:READ:', tags: ['API'] },
            { key: 'RESOURCE-MANAGER:TEMPLATE:WRITE:', tags: ['BUTTON'] },
            // { key: 'RESOURCE-MANAGER:CONFIG:READ:', tags: ['BUTTON'] },   未用到
            // { key: 'RESOURCE-MANAGER:CONFIG:READ:', tags: ['API'] },      未用到
            { key: 'RESOURCE-MANAGER:CONFIG:WRITE:', tags: ['BUTTON'] },
            { key: 'RESOURCE-MANAGER:USER_STATE:READ:', tags: ['BUTTON'] },
            { key: 'RESOURCE-MANAGER:USER_STATE:READ:', tags: ['API'] },
            { key: 'RESOURCE-MANAGER:GLOBAL_STATE:READ:', tags: ['BUTTON'] },
            { key: 'RESOURCE-MANAGER:GLOBAL_STATE:READ:', tags: ['API'] },

            // USER MANAGER
            { key: 'USER-MANAGER:USER:READ:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:USER:READ:', tags: ['API'] },
            { key: 'USER-MANAGER:USER:WRITE:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:USER:PASSWORD-RESET:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:GROUP:READ:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:GROUP:READ:', tags: ['API'] },
            { key: 'USER-MANAGER:GROUP:WRITE:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:ROLE:READ:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:ROLE:READ:', tags: ['API'] },
            { key: 'USER-MANAGER:ROLE:WRITE:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:PERMISSION:READ:', tags: ['BUTTON'] },
            { key: 'USER-MANAGER:PERMISSION:READ:', tags: ['API'] },
            { key: 'USER-MANAGER:PERMISSION:WRITE:', tags: ['API'] },

            // SYSTEM MANAGER
            { key: 'SYSTEM-MANAGER:GLOBAL_RESOURCE:READ:', tags: ['BUTTON'] },
            { key: 'SYSTEM-MANAGER:GLOBAL_RESOURCE:READ:', tags: ['API'] },
            { key: 'SYSTEM-MANAGER:POD_REAL_RESOURCE:READ:', tags: ['BUTTON'] },
            { key: 'SYSTEM-MANAGER:POD_REAL_RESOURCE:READ:', tags: ['API'] },
            { key: 'SYSTEM-MANAGER:POD_LOG:READ:', tags: ['BUTTON'] },
            { key: 'SYSTEM-MANAGER:POD_LOG:READ:', tags: ['API'] },
            { key: 'SYSTEM-MANAGER:POD_STATE:READ:', tags: ['BUTTON'] },
            { key: 'SYSTEM-MANAGER:POD_STATE:READ:', tags: ['API'] },

            // PROJECT MANAGER
            { key: 'PROJECT-MANAGER:PROJECT:CREATE:', tags: ['BUTTON'] },
            // { key: 'PROJECT-MANAGER:PROJECT:READ:', tags: ['API'] },     等待页面调整
            { key: 'PROJECT-MANAGER:TEMPLATE_PROJECT:CREATE:', tags: ['BUTTON'] },
            // { key: 'PROJECT-MANAGER:TEMPLATE_PROJECT:READ:', tags: ['API'] },    等待页面调整
            { key: 'PROJECT-MANAGER:TEMPLATE_PROJECT:WRITE:', tags: ['BUTTON'] },
            { key: 'PROJECT-MANAGER:COOPERATE_PROJECT:CREATE:', tags: ['BUTTON'] },
            // { key: 'PROJECT-MANAGER:COOPERATE_PROJECT:READ:', tags: ['API'] },     等待页面调整
            { key: 'PROJECT-MANAGER:TASK:CREATE:', tags: ['BUTTON'] },
            { key: 'PROJECT-MANAGER:TASK:READ:', tags: ['API'] },
            { key: 'PROJECT-MANAGER:TASK:SAVE_IMAGE:', tags: ['BUTTON'] },

            // IMAGE MANAGER
            { key: 'IMAGE-MANAGER:IMAGE:READ:', tags: ['API'] },
            { key: 'IMAGE-MANAGER:IMAGE:SHARE:', tags: ['BUTTON'] },
            { key: 'IMAGE-MANAGER:IMAGE_PACKAGE:READ:', tags: ['API'] },
            { key: 'IMAGE-MANAGER:IMAGE_BUILDER:READ:', tags: ['API'] },
            { key: 'IMAGE-MANAGER:IMAGE_BUILDER:BUILD_BASIC:', tags: ['BUTTON'] },
            { key: 'IMAGE-MANAGER:IMAGE_BUILDER:BUILD_TAR:', tags: ['BUTTON'] },
            { key: 'IMAGE-MANAGER:IMAGE_BUILDER:BUILD_IMAGE_FILE:', tags: ['BUTTON'] },
            { key: 'IMAGE-MANAGER:IMAGE_BUILDER:BUILD_CONTAINER_IMAGE:', tags: ['BUTTON'] },
            { key: 'IMAGE-MANAGER:IMAGE_SOURCE_REPOS:READ:', tags: ['API'] },

            // MODEL MANAGER
            { key: 'MODEL-MANAGER:MODEL:CREATE:', tags: ['BUTTON'] },
            { key: 'MODEL-MANAGER:MODEL:READ:', tags: ['API'] },
            { key: 'MODEL-MANAGER:MODEL:SHARE:', tags: ['BUTTON'] },
            { key: 'MODEL-MANAGER:MODEL_VERSION:CREATE:', tags: ['BUTTON'] },
            { key: 'MODEL-MANAGER:MODEL_VERSION:READ:', tags: ['API'] },


            // SKYFLOW MANAGER
            { key: 'SKYFLOW-MANAGER:FLOW:CREATE:', tags: ['BUTTON'] },
            { key: 'SKYFLOW-MANAGER:FLOW:READ:', tags: ['API'] },
            { key: 'SKYFLOW-MANAGER:FLOW:READ:', tags: ['BUTTON'] },
            { key: 'SKYFLOW-MANAGER:FLOW:SHARE:', tags: ['BUTTON'] },
            { key: 'SKYFLOW-MANAGER:TEMPLATE_FLOW:CREATE:', tags: ['BUTTON'] },
            { key: 'SKYFLOW-MANAGER:TEMPLATE_FLOW:READ:', tags: ['API'] },
            { key: 'SKYFLOW-MANAGER:TEMPLATE_FLOW:READ:', tags: ['BUTTON'] },
            { key: 'SKYFLOW-MANAGER:TEMPLATE_FLOW:WRITE:', tags: ['BUTTON'] },
            { key: 'SKYFLOW-MANAGER:FLOW_RECORD:READ:', tags: ['API'] },

            // FILE MANAGER
            { key: 'FILE-MANAGER:FILE:READ:', tags: ['API'] },
            { key: 'FILE-MANAGER:FILE:UPLOAD:', tags: ['BUTTON'] },
            { key: 'FILE-MANAGER:FILE:DOWNLOAD:', tags: ['BUTTON'] },
            { key: 'FILE-MANAGER:FILE:SHARE:', tags: ['BUTTON'] }
        ]);
        user.user.userId = user.user.uuid;
        return user.user;
    },
    authSwitch: 'ON'
});

new Vue({
    router,
    store,
    i18n,
    template: '<App/>',
    components: {
        App
    },
    data: {
        eventHub: new Vue()
    }
}).$mount('#app');

store.dispatch('auth').then(() => {
    router.beforeEach((to, from, next) => {
        NProgress.start(); // 开启Progress
        next();
    });

    router.afterEach(() => {
        NProgress.done(); // 结束Progress
    });

    // 生产环境错误日志
    if (process.env.NODE_ENV === 'production') {
        Vue.config.errorHandler = function(err, vm) {
            console.log(err, window.location.href);
            errLog.pushLog({
                err,
                url: window.location.href,
                vm
            });
        };
    }
}, () => {
    router.replace({
        name: 'Login'
    });
});
