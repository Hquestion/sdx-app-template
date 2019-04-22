import axios from 'axios';
import router from '../router';
import store from '../store';
import errorHandler from '../helper/error-handler';

import { MOCK_API_CONFIG } from '../../mock.config';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api的base_url
    timeout: 5 * 60000// 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    config => {
    // Do something before request is sent
        /*  if (store.getters.token) {
    config.headers['X-Token'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }*/
        if (process.env.NODE_ENV === 'development') {
            if (MOCK_API_CONFIG.includes(config.url)) {
                config.url = `/mock${config.url.replace('/v2', '')}`;
            }
        }
        return config;
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error);
    }
);

// respone拦截器
service.interceptors.response.use(
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    response => {
        console.log(response);
        if (typeof response.data === 'string' || response.data.success) {
            return Promise.resolve(response);
        } else {
            if (response.data.type === 'Unauthorized') {
                store.commit('SET_SESSION_REMOVE');
                store.commit('SET_ROLE', null);
                store.commit('SET_USERID', '');
                router.push({ path: '/login' });
                return Promise.resolve(response);
            } else {
                // 处理错误
                if (!response.config.preventError) {
                    errorHandler(response.data.error_code, response.data.msg);
                }
                return Promise.reject(response);
            }
        }
    },
    error => {
        const COMMON_ERROR = '服务器繁忙，请稍后再试！';
        if (!error.response) {
            errorHandler('', COMMON_ERROR);
            return Promise.reject(COMMON_ERROR);
        }
        if (error.response.status === 401) {
            store.commit('SET_SESSION_REMOVE');
            store.commit('SET_ROLE', null);
            store.commit('SET_USERID', '');
            router.push({ path: '/login' });
            if (!error.response.config.preventError) {
                errorHandler(error.response.status, '登陆超时，请重新登陆');
            }
            return Promise.reject('登陆超时，请重新登陆');
        } else if (
            error.response.status >= 400
        ) {
            // // 对于大文件解压超时问题，暂时处理方式：502状态提示如下信息
            // if (error.response.status === 502 && error.config.url === '/v2/ceph/unzip') {
            //     return Promise.reject('解压失败：可能的原因是，文件太大，解压超时，请在后台使用命令重试。');
            // }
            if (!error.response.config.preventError) {
                errorHandler(error.response.status, COMMON_ERROR);
            }
            return Promise.reject('服务器繁忙，请稍后再试！');
        }
    }
);

export default service;
