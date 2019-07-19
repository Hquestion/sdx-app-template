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
        breadcrumbHistory: []
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
        pushBreadcrumbHistory(state, to) {
            let cachedHis = localStorage.getItem('history');
            if (cachedHis) {
                cachedHis = JSON.parse(cachedHis);
            }
            let breadcrumbHistory = cachedHis || [];
            const route = {
                name: to.name,
                path: to.path,
                query: to.query,
                params: to.params,
                meta: to.meta
            };
            if (route.meta.isRoot) {
                breadcrumbHistory = [];
                breadcrumbHistory.push(route);
            } else {
                // 如果路由在历史记录中
                let historyIndex = breadcrumbHistory.findIndex(item => item.name === route.name);
                if (historyIndex >= 0) {
                    breadcrumbHistory = breadcrumbHistory.slice(0, historyIndex + 1);
                } else {
                    breadcrumbHistory.push(route);
                }
            }
            // deleteOb(state.breadcrumbHistory)
            localStorage.setItem('history', JSON.stringify(breadcrumbHistory));
            state.breadcrumbHistory = breadcrumbHistory;
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
