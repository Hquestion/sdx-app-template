import Heartbeat from '@sdx/utils/lib/helper/heartbeat';
import Cache from '@sdx/utils/lib/helper/cache';
import shareCenter from '@sdx/utils/lib/helper/shareCenter';
import { RESOURCE_KEY, RESOURCE_TMPL_KEY, RESOURCE_CONFIG_KEY } from '@sdx/utils/lib/const/cache';

const app = {
    state: {
        sidebar: {
            opened: true
        },
        theme: 'default',
        livenewsChannels: '[]',
        guide: {
            hasShown: false,
            visible: false,
            neverShow: !!JSON.parse(localStorage.getItem('guideNeverShow')) || false
        },
        isExplicitLogin: false,
        heartbeat: null,
        cache: {}
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened;
        },
        SET_LIVENEWS_CHANNELS: (status, channels) => {
            status.livenewsChannels = JSON.stringify(channels);
        },
        TOGGLE_GUIDE: (state, isForce) => {
            if (!isForce) {
                if (!state.guide.visible) {
                    /**
                     * 满足以下条件才显示快速入口：
                     * 1.一次应用生命周期内没有显示过
                     * 2.显式登陆
                     * 3.没有设置不再显示
                     */
                    if (!state.hasShown && !state.guide.neverShow && state.isExplicitLogin) {
                        state.hasShown = true;
                        state.guide.visible = true;
                    }
                } else {
                    state.guide.visible = false;
                }
            } else {
                state.guide.visible = !state.guide.visible;
            }
        },
        SET_GUIDE_SHOWN: (state, flag) => {
            localStorage.setItem('guideNeverShow', flag);
            state.guide.neverShow = flag;
        },
        SET_EXPLICIT_LOGIN(state) {
            state.isExplicitLogin = true;
        },
        INIT_HEARTBEAT(state) {
            state.heartbeat = Heartbeat.getSingleton({
                interfaces: [
                    {
                        method: 'get',
                        url: '/fe-compose/api/v1/heartbeat',
                        key: 'result',
                        data: {
                            userId: shareCenter.getUser() && shareCenter.getUser().uuid
                        }
                    }
                ]
            });
        },
        START_HEARTBEAT(state) {
            state.heartbeat.start(result => {
                let list = result.result[0];
                [RESOURCE_KEY, RESOURCE_TMPL_KEY, RESOURCE_CONFIG_KEY].forEach((key, index) => {
                    const resp = Object.assign({}, list[index]);
                    state.cache[key] = resp;
                    Cache.set(key, resp);
                });
                console.log(Cache._cache);
            });
        },
        CANCEL_HEARTBEAT(state) {
            state.heartbeat.cancel();
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR');
        },
        setTheme: ({ commit }, theme) => {
            commit('SET_THEME', theme);
        },
        setlivenewsChannels: ({ commit }, channels) => {
            commit('SET_LIVENEWS_CHANNELS', channels);
        },
        toggleGuide({ commit }, isForce) {
            commit('TOGGLE_GUIDE', isForce);
        },
        setGuideShown({ commit }, flag) {
            commit('SET_GUIDE_SHOWN', flag);
        },
        startHeartbeat({ commit }) {
            commit('INIT_HEARTBEAT');
            commit('START_HEARTBEAT');
        }
    }
};

function deleteOb(obj) {
    if (!obj) return;
    delete obj.matched;
    if (obj.__ob__) {
        delete obj.__ob__;
    }
    if (typeof obj !== 'object') {
        return;
    }
    if (!Array.isArray(obj)) {
        obj = [obj];
    }
    obj.forEach(o => {
        if (o) {
            Object.getOwnPropertyNames(o).forEach((item, index) => {
                deleteOb(o[item]);
            });
        }
    });
}

export default app;
