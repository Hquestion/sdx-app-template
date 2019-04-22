/*
 * 用户信息存储,只存储当前用户的信息
 * @Author: jiasong.shao
 * @Date: 2018-04-25 09:27:55
 * @Last Modified by: jiasong.shao
 * @Last Modified time: 2018-07-31 18:05:26
 */

import { login, logout, userDetail } from '@/utils/authApis';

const user = {
    state: {
        userId: '',
        session: false,
        role: {},
        user: {
            role: {}
        },
        userName: '',
        quota: null,
        group: null
    },

    mutations: {
        SET_USERID(state, id) {
            state.userId = id;
        },

        SET_USERNAME(state, userName) {
            state.userName = userName;
        },

        SET_USER(state, user) {
            state.user = user;
        },

        SET_ROLE(state, role) {
            state.role = role;
        },
        SET_QUOTA(state, quota) {
            state.quota = quota;
        },
        SET_GROUP(state, group) {
            state.group = group;
        },
        SET_SESSION_INIT(state) {
            state.session = true;
        },

        SET_SESSION_REMOVE(state) {
            state.session = false;
        },
        REMOVE_ALL(state) {
            state.userId = '';
            state.session = false;
            state.role = {};
            state.user = {
                role: {}
            };
            state.userName = '';
            state.quota = null;
            state.group = null;
        }
    },

    actions: {
        login({ commit }, userInfo) {
            return login(userInfo)
                .then(data => {
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    }
                    commit('SET_SESSION_INIT');
                    commit('SET_ROLE', data.role);
                    commit('SET_USERID', data._id);
                    commit('SET_QUOTA', data.quota);
                    commit('SET_GROUP', data.group);
                    commit('SET_USERNAME', data.name);
                    commit('SET_USER', data);
                })
                .catch(error => {
                    commit('REMOVE_ALL');
                    return Promise.reject(error);
                });
        },
        currentUser({ commit }) {
            return userDetail()
                .then(data => {
                    commit('SET_SESSION_INIT');
                    commit('SET_ROLE', data.role);
                    commit('SET_USERID', data._id);
                    commit('SET_QUOTA', data.quota);
                    commit('SET_GROUP', data.group);
                    commit('SET_USERNAME', data.name);
                    commit('SET_USER', data);
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
                })
                .catch(error => error);
        }
    }
};

export default user;
