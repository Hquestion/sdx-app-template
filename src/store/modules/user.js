import { login, logout } from '../../api/auth';
import { getUserDetail } from '@sdx/utils/lib/api/user';
import moment from 'moment';
import router from '../../router';

let cachedToken = sessionStorage.getItem('token');
if (cachedToken) {
    cachedToken = JSON.parse(cachedToken);
} else {
    cachedToken = {};
}
let expireTimer = null;


const user = {
    state: {
        token: cachedToken,
        user: null
    },

    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        REMOVE_ALL(state) {
            state.token = {};
            state.user = null;
            sessionStorage.removeItem('token');
            clearTimeout(expireTimer);
        },
        SET_TOKEN(state, token) {
            sessionStorage.setItem('token', JSON.stringify(token));
            state.token = token;
        }
    },

    actions: {
        login({ commit, dispatch }, userInfo) {
            return login(userInfo)
                .then(data => {
                    commit('SET_TOKEN', data);
                    return dispatch('auth');
                })
                .catch(error => {
                    commit('REMOVE_ALL');
                    return Promise.reject(error);
                });
        },
        logout({ commit }) {
            return logout()
                .then(() => {
                    commit('REMOVE_ALL');
                });
        },
        userInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.user) {
                    resolve(state.user);
                } else {
                    if (state.token.userId) {
                        getUserDetail(state.token.userId).then(res => {
                            commit('SET_USER', res);
                            resolve(res);
                        }, e => {
                            reject(e);
                        });
                    } else {
                        reject('Unauthorize');
                    }
                }
            });
        },
        auth({ commit, state }) {
            return new Promise((resolve, reject) => {
                if (state.token && state.token.accessToken) {
                    // 用户存在，校验失效时间，如果未过期则启动失效定时器，否则直接退出登陆
                    const expireTime = moment.utc(state.token.expiresAt);
                    const now = moment.utc();
                    if (now > expireTime) {
                        // 失效，退出登陆
                        reject();
                    } else {
                        // 未失效，启动定时器
                        clearTimeout(expireTimer);
                        expireTimer = setTimeout(() => {
                            logout().then(() => {
                                commit('REMOVE_ALL');
                                router.replace({
                                    name: 'Login'
                                });
                            });
                        }, expireTime - now);
                        resolve();
                    }
                } else {
                    // 没有用户信息直接退出登陆
                    reject();
                }
            });
        }
    }
};

export default user;
