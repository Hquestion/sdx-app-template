/*
 * 资源模块,用来存储总资源和总剩余资源
 * 群组资源单独管理,并不在这里
 * 个人资源单独管理,并不在这里
 * @Author: jiasong.shao
 * @Date: 2018-04-24 16:20:53
 * @Last Modified by: jiasong.shao
 * @Last Modified time: 2018-04-24 20:18:15
 */

import { getTotalResource, getFreeResource } from 'utils/resourceApis';
import { getResources } from 'utils/homeApis';
import co from 'co';

const resource = {
    state: {
        total_resource: {
            // 所有资源
            cpu: 0,
            gpu: 0,
            mem: 0,
            disk: 0,
            disk_mb: 0,
            memory_mb: 0
        },
        total_resource_free: {
            // 所有空闲资源
            cpu: 0,
            gpu: 0,
            mem: 0,
            disk: 0,
            disk_mb: 0,
            memory_mb: 0
        },
        quota: {
            cpu: 0,
            mem: 0,
            gpu: 0
        },
        total: {
            cpu: 0,
            mem: 0,
            gpu: 0
        }
    },
    mutations: {
        /**
         * 设置所有资源和剩余资源
         */
        UPDATE_RESOURCE(state, data) {
            state.total_resource = data.totalResource;
            state.total_resource_free = data.totalResourceFree;
        },
        /**
         * 设置剩余资源
         */
        UPDATE_RESOURCE_FREE(state, data) {
            state.total_resource_free = data;
        },
        /**
         * 设置当前资源和剩余资源
         */
        UPDATE_ROLE(state, data) {
            state.quota = data.user_free;
            state.total = data.user_total;
        }
    },
    actions: {
        /**
         * 获取所有资源和剩余资源
         */
        getResource(context) {
            return co(function* () {
                let [totalResource, totalResourceFree] = yield [
                    getTotalResource(),
                    getFreeResource()
                ];
                context.commit('UPDATE_RESOURCE', {
                    totalResource,
                    totalResourceFree
                });
            });
        },
        /**
         * 获取剩余资源
         */
        getResourceFree(context) {
            return co(function* () {
                let totalResourceFree = yield getFreeResource();
                context.commit('UPDATE_RESOURCE_FREE', totalResourceFree);
            });
        },
        /**
         * 获取当前用户资源
         */
        getResourceRole(context) {
            return co(function* () {
                let resourceRole = yield getResources();
                context.commit('UPDATE_ROLE', resourceRole);
            });
        }
    }
};

export default resource;
