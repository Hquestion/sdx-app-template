import { cephLs } from 'utils/fileApis';
const fileList = {
    state: {
        fileList: [], // 当前文件夹文件
        project_id: null,
        isSearch: false,
        searchVal: '',
        selectedRows: [],
        isEditStatus: false,
        isShareStatus: false,
        downLoading: [],
        unziping: [],
        isGlobalShare: false,
        sharePathHistory: []
    },
    mutations: {
        updateFileList(state, value) {
            state.fileList = value || [];
        },
        removeAll(state) {
            state.fileList = [];
            state.isSearch = false;
            state.selectedRows = [];
            state.searchVal = '';
        },
        getProjectId(state, value) {
            state.project_id = value;
        },
        toggleSearchState(state, val) {
            state.isSearch = val;
            if (!val) {
                state.searchVal = '';
            }
        },
        setSearchVal(state, val) {
            state.searchVal = val;
        },
        setSelectedRows(state, val) {
            state.selectedRows = val;
        },
        setEditStatus(state, val) {
            state.isEditStatus = val;
        },
        setShareStatus(state, val) {
            state.isShareStatus = val;
        },
        setDownLoading(state, val) {
            state.downLoading = val || [];
        },
        setUnziping(state, val) {
            state.unziping.push(val);
        },
        removeUnziping(state, val) {
            if (val) {
                let index = state.unziping.findIndex(item => item === val);
                if (index !== -1) {
                    state.unziping.splice(index, 1);
                }
            } else {
                state.unziping = [];
            }
        },
        setGlobalShareStatus(state, val) {
            state.isGlobalShare = val;
        },
        pushShareHistory(state, item) {
            state.sharePathHistory.push(item);
        },
        clearShareHistory(state) {
            state.sharePathHistory = [];
        },
        cutShareHistory(state, index) {
            state.sharePathHistory = state.sharePathHistory.slice(0, index + 1);
        }
    },
    actions: {
        // 获取文件列表,加 page_size 限制查询数量
        getFileList(context, value) {
            let query = {
                path: value.path.join('/'),
                page_size: value.page_size
            };
            if (value.ref) {
                query.ref = value.ref;
            }
            return cephLs(query).then(data => {
                context.commit('setShareStatus', data.is_group_shared || data.is_public_shared);
                context.commit('updateFileList', data.paths);
                return Promise.resolve(data);
            });
        },
        refresh({ dispatch }, value) {
            return dispatch('getFileList', value);
        }
    }
};

export default fileList;
