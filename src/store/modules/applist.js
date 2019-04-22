import fetch from '../../utils/fetch';
import { IDE_typeConfig, statusConfig, IDE_statusConfig } from '../../views/config/fieldConfig';
import { Notification as $notify } from 'element-ui';
import { pollStatus, init as pollInit } from '../../components/task/updateStatus';
const appList = {
    state: {
        resourceList: {
            //  通用资源
            EXECUTOR_CPU_CORES: 0,
            EXECUTOR_MEMORY_MB: 0,
            EXECUTOR_DISK_MB: 0,
            EXECUTOR_GPUS: 0,
            EXECUTOR_INSTANCES: 0,
            // spark资源
            driver_cores: 0,
            driver_memory: 0,
            // tensorflow资源
            ps_cpu_cores: 0,
            ps_gpus: 0,
            ps_memory_mb: 0,
            ps_disk_mb: 0,
            worker_cpu_cores: 0,
            worker_gpus: 0,
            worker_memory_mb: 0,
            worker_disk_mb: 0

        },
        applist: [],
        pollList: []
    },
    mutations: {

        updateResDriver_cores(state, value) {
            state.resourceList.driver_cores = value;
        },
        updateResDriver_memory(state, value) {
            state.resourceList.driver_memory = value;
        },
        updateResExecutor_instance(state, value) {
            state.resourceList.executor_instance = value;
        },
        updateResExecutor_memory(state, value) {
            state.resourceList.executor_memory = value;
        },
        updateResExecutor_cores(state, value) {
            state.resourceList.executor_cores = value;
        },
        updateResMaxGpus(state, value) {
            state.resourceList.executor_max_gpus = value;
        },
        updateResPsCpuCores(state, value) {
            state.resourceList.ps_cpu_cores = value;
        },
        updateResPsGpus(state, value) {
            state.resourceList.ps_gpus = value;
        },
        updateResPsMemoryMb(state, value) {
            state.resourceList.ps_memory_mb = value;
        },
        updateResPsDiskMb(state, value) {
            state.resourceList.ps_disk_mb = value;
        },
        updateResWorkerCpuCores(state, value) {
            state.resourceList.worker_cpu_cores = value;
        },
        updateResWorkerGpus(state, value) {
            state.resourceList.worker_gpus = value;
        },
        updateResWorkerMemoryMb(state, value) {
            state.resourceList.worker_memory_mb = value;
        },
        updateResWorkerDiskMb(state, value) {
            state.resourceList.worker_disk_mb = value;
        },
        updateResEXECUTOR_CPU_CORES(state, value) {
            state.resourceList.EXECUTOR_CPU_CORES = value;
        },
        updateResEXECUTOR_MEMORY_MB(state, value) {
            state.resourceList.EXECUTOR_MEMORY_MB = value;
        },
        updateResEXECUTOR_DISK_MB(state, value) {
            state.resourceList.EXECUTOR_DISK_MB = value;
        },
        updateResEXECUTOR_GPUS(state, value) {
            state.resourceList.EXECUTOR_GPUS = value;
        },

        updateApplist(state, value) {
            state.applist = value.tasks;
            state.pollList = value.poll_ids;
        },
        updateTask(state, { task, flag = false }) { // flag 用来检查是否轮询后进行的操作，flag=true 为轮询情况
            let i = 0;
            let tmp = state.applist;
            let len = tmp.length;
            let oldStatus, newStatus, name;
            for (; i < len; i++) {
                if (tmp[i].id === task.id) {
                    oldStatus = tmp[i].status;
                    newStatus = task.status;
                    name = task.name;
                    if (flag) {
                        let isIDE = IDE_typeConfig.hasOwnProperty(task.type);
                        $notify.info({
                            title: '状态更新',
                            message: `${task.type}--${task.name},状态由${isIDE ? IDE_statusConfig[tmp[i].state_label].ZN_tip : statusConfig[tmp[i].state_label].ZN_tip}更新为${isIDE ? IDE_statusConfig[task.state_label].ZN_tip : statusConfig[task.state_label].ZN_tip}`
                        });
                        Object.assign(tmp[i], task);
                    } else {
                        tmp.splice(i, 1, task);
                    }
                    break;
                }
            }
        },
        // 清空资源
        clearRes(state) {
            for (let key in state.resourceList) {
                state.resourceList[key] = 0;
            }
        },

        updatePollList(state, { task, option }) {
            switch (option) {
                    case 'add':
                    // value 为单个任务
                        if (state.pollList.indexOf(task.id) < 0) {
                            state.pollList.push(task.id);
                        }
                        break;
                    default:
                        // 更新缓存对象
                        if (task.pollList) {
                            for (let i = 0; i < task.pollList.length; i++) {
                                // 确定替换位置
                                let ind = state.applist.findIndex(value => value.id === task.pollList[i].id);
                                // 替换对象
                                state.applist.splice(ind, 1, task.pollList[i]);
                            }
                        }
                        // value 为多个任务
                        state.pollList = task.poll_ids;
            }
            if (!pollStatus && state.pollList.length !== 0) { // 判断task 不为空数组,pollList 由没有变成有的时候，需要开启
            // pollInit();
                pollInit('checkPollList', state.pollList);
            }
        }
    },
    actions: {
        fetchapplist({
            commit
        }) {
            return (fetch.get('task/list').then(r => {
                if (r.status === 200 && r.data.state === 'ok') {
                    commit('updateApplist', r.data);
                }
            }));
        },
        fetchPollList({
            commit
        }) {
            return (fetch.get('task/list').then(r => {
                if (r.status === 200 && r.data.state === 'ok') {
                    commit('updatePollList', { task: r.data });
                }
            }));
        },
        // 获取单个任务的信息
        fetchApp({ commit }, { id, flag = false }) { // flag 表明是否是用来检查状态
            return (fetch.get('task/get?id=' + id).then(r => {
                if (r.data.state === 'ok') {
                    commit('updateTask', { task: r.data.task, flag });
                } else {
                    throw new Error('错误信息：任务查询任务。');
                }
            }).catch(e => {
                throw new Error('错误信息：' + e.message);
            }));
        },
        // 检查状态
        checkPollList({ commit }, poll_ids) {
            return (fetch.post('poll/status', {
                poll_ids
            }).then(r => {
                commit('updatePollList', { task: r.data });
            }).catch(e => {
                throw new Error('错误信息：' + e.message);
            }));
        },
        fetchAppDelete({
            dispatch
        }, id) {
            return (fetch.post('task/remove', {
                id
            }).then(r => {
                if (r.status === 200 && r.data.state === 'ok') {
                    dispatch('fetchapplist');
                } else {
                    throw new Error('错误信息：' + r.data.message);
                }
            }));
        },
        fetchAppSubmit({
            commit
        }, id) {
            return (fetch.post('task/submit', {
                id
            }).then(r => {
                if (r.status === 200 && r.data.state === 'ok') {
                    commit('updateTask', { task: r.data.task });
                } else {
                    throw new Error('错误信息：' + r.data.message);
                }
            }));
        },
        fetchAppKill({
            commit
        }, id) {
            return (fetch.post('task/kill', {
                id
            }).then(r => {
                if (r.status === 200 && r.data.state === 'ok') {
                    commit('updateTask', { task: r.data.task });
                } else {
                    throw new Error('错误信息：' + r.data.message);
                }
            }));
        },

        fetchAppRestart({
            commit
        }, id) {
            return (fetch.post('task/restart', {
                id
            }).then(r => {
                if (r.status === 200 && r.data.state === 'ok') {
                    commit('updateTask', { task: r.data.task });
                } else {
                    throw new Error('错误信息：' + r.data.message);
                }
            }));
        }
    }
};

export default appList;
