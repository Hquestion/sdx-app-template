// @flow
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
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
import ElementUI from 'element-ui';
import SdxUI from '@sdx/ui';
import SdxWidget from '@sdx/widget';
import shareCenter from '@sdx/utils/lib/helper/shareCenter';
// import febAlive from 'feb-alive';

// Vue.use(febAlive, { router, keyName: 'feb' });
Vue.use(EmitAsync);

// import directives by shaojs 2018年 2月22日 星期四 17时11分29秒 CST

Vue.use(directives);
// register globally
Vue.use(ElementUI);
Vue.use(SdxUI);
Vue.use(SdxWidget);
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

shareCenter.setup({
    user() {
        const user = store.state.user.token;
        user.user.userId = user.user.uuid;
        return user.user;
    },
    authSwitch: 'ON',
    i18n
});

const app = new Vue({
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

router.beforeEach((to, from, next) => {
    NProgress.start();
    store.dispatch('auth').then(() => {
        next();
    }, () => {
        if (to.name !== 'Login') {
            const path = encodeURIComponent(location.href);
            next({
                name: 'Login',
                replace: true,
                query: {
                    redirect: path
                }
            });
        } else {
            next();
        }
    });
});

router.afterEach(to => {
    NProgress.done();
});

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
    Vue.config.errorHandler = function(err, vm) {
        console.error(err, window.location.href);
        errLog.pushLog({
            err,
            url: window.location.href,
            vm
        });
    };
}

store.dispatch('auth').then(() => true, () => {
    if (app.$route.name !== 'Login') {
        const path = encodeURIComponent(location.href);
        router.replace({
            name: 'Login',
            replace: true,
            query: {
                redirect: path
            }
        });
    }
});

