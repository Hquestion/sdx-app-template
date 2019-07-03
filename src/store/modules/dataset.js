import { SAVE_TYPE_OPTIONS } from '../../views/datamanagement/dataset-create/config';

/**
 * 简化版比较两个对象是否相等
 * @param origin
 * @param target
 * @returns {boolean}  true: 相等  false:不等
 */
const compareObject = (origin, target) => {
    if (typeof origin === 'object' && typeof target === 'object') {
        let sourceKeys = Object.keys(origin);
        let isEqual = true;
        sourceKeys.forEach(key => {
            if (origin[key] !== target[key]) {
                isEqual = false;
            }
        });
        return isEqual;
    } else {
        return false;
    }
};

const initState = () => ({
    currentStep: 0,
    isCreating: false,
    creatingType: 'NON_STRUCT', // NON_STRUCT
    form: {
        baseInfo: {},
        dataServiceInfo: {},
        dataSource: {
            sourceType: '',
            fileType: 'CSV',
            firstLineAsSchema: false,
            splitor: ',',
            charset: 'UTF-8',
            file: '',
            hdfsFile: '',
            quote: '"',
            escape: '\\',
            tableName: '',
            sql: ''
        },
        nonStructDataSource: {
            sourceType: '0',
            local: {
                file: '' // 文件路径
            },
            hdfs: {
                file: ''
            }
        },
        nonStructDataTarget: {
            targetType: '0',
            local: {
                file: '', // 保存位置路径
                fileType: 'AVRO', // 文件类型
                storeType: SAVE_TYPE_OPTIONS[0].value, // 存储方式
                rights: '1'
            },
            hdfs: {
                file: '',
                fileType: 'AVRO',
                storeType: SAVE_TYPE_OPTIONS[0].value,
                rights: '1'
            }
        },
        structDataSource: {
            sourceType: '1',
            local: {
                fileType: 'CSV',
                firstLineAsSchema: false,
                splitor: ',',
                charset: 'UTF-8',
                file: '',
                quote: '"',
                escape: '\\'
            },
            hdfs: {
                fileType: 'CSV',
                firstLineAsSchema: false,
                splitor: ',',
                charset: 'UTF-8',
                file: '',
                quote: '"',
                escape: '\\'
            },
            sql: {
                url: '',
                username: '',
                password: '',
                driverClass: '',
                driverFile: '',
                sql: '',
                connectStatus: '',
                tableName: ''
            }
        },
        structDataSetting: {
            samplingNum: 1000,
            sampling: 'topN',
            schemaFile: '',
            schema: 'auto',
            schemaList: [],
            schemaChanged: false
        },
        structDataPreProcessing: {
            schemaActions: [],
            // data: [],
            destSchema: Object.freeze([])
        },
        structDataTarget: {
            targetType: '1',
            local: {
                partition: [],
                saveType: SAVE_TYPE_OPTIONS[0].value,
                fileType: 'CSV',
                savePath: [],
                rights: '1',
                sharedUsers: [],
                sharedGroups: [],
                shareType: 'PRIVATE'
            },
            hdfs: {
                partition: [],
                saveType: SAVE_TYPE_OPTIONS[0].value,
                fileType: 'CSV',
                savePath: '',
                sharedUsers: [],
                sharedGroups: [],
                shareType: 'PRIVATE'
            },
            sql: {
                partition: [],
                url: '',
                username: '',
                password: '',
                driverClass: '',
                driverFile: '',
                tableName: '',
                saveType: SAVE_TYPE_OPTIONS[0].value,
                connectStatus: '',
                sharedUsers: [],
                sharedGroups: [],
                shareType: 'PRIVATE'
            }
        }
    }
});
const state = {
    ...initState()
};

const getters = {
    stepLength: () => state.creatingType === 'STRUCT' ? 6 : 3
};

const mutations = {
    UPDATE_CURRENT_STEP(state, stepIndex) {
        state.currentStep = stepIndex;
    },
    SET_CREATING_TYPE(state, type) {
        state.creatingType = type;
    },
    SET_DATASET_BASEINFO(state, data) {
        state.form.baseInfo = data;
    },
    SET_DATA_SERVICE(state, data) {
        state.form.dataServiceInfo = data;
    },
    SET_NON_STRUCT_DATA_SOURCE(state, { params, type }) {
        state.form.nonStructDataSource.sourceType = type;
        if (type === '1') {
            state.form.nonStructDataSource.local.file = params.file;
        } else {
            state.form.nonStructDataSource.hdfs.file = params.file;
        }
    },
    SET_NON_STRUCT_DATA_TARGET(state, { params, type }) {
        state.form.nonStructDataTarget.targetType = type;
        if (type === '1') {
            state.form.nonStructDataTarget.local.file = params.savePath;
            state.form.nonStructDataTarget.local.fileType = params.fileType;
            state.form.nonStructDataTarget.local.storeType = params.saveType;
            state.form.nonStructDataTarget.local.rights = params.rights;
        } else {
            state.form.nonStructDataTarget.hdfs.file = params.savePath;
            state.form.nonStructDataTarget.hdfs.fileType = params.fileType;
            state.form.nonStructDataTarget.hdfs.storeType = params.saveType;
            state.form.nonStructDataTarget.hdfs.rights = params.rights;
        }
    },
    SET_STRUCT_DATA_SOURCE(state, { params, type }) {
        // 需判断数据源是否改变，如果改变，需要清空第四部缓存的schema以及第五步缓存的actions
        let isSourceChange = false;
        if (type !== state.form.structDataSource.sourceType) {
            isSourceChange = true;
        }
        state.form.structDataSource.sourceType = type;
        if (type === '1') {
            // 本地文件系统
            isSourceChange = !compareObject(state.form.structDataSource.local, params);
            state.form.structDataSource.local = Object.assign({}, state.form.structDataSource.local, params);
        } else if (type === '2') {
            // hdfs文件系统
            isSourceChange = !compareObject(state.form.structDataSource.hdfs, params);
            state.form.structDataSource.hdfs = Object.assign({}, state.form.structDataSource.hdfs, params);
        } else {
            // sql database
            isSourceChange = !compareObject(state.form.structDataSource.sql, params);
            state.form.structDataSource.sql = Object.assign({}, state.form.structDataSource.sql, params);
        }
        // 每次更改数据源，都清空第四步中缓存的schema，以确保在修改了数据源之后重新生成schema
        if (isSourceChange) {
            state.form.structDataSetting.schemaList = [];
            state.form.structDataSetting.schemaChanged = false;
            state.form.structDataPreProcessing.schemaActions = [];
        }
    },
    SET_STRUCT_DATA_SETTING(state, params) {
        state.form.structDataSetting = Object.assign({}, state.form.structDataSetting, params);
    },
    SET_STRUCT_DATA_TARGET(state, { params, type }) {
        state.form.structDataTarget.targetType = type;
        let kind = type.split('@')[0];
        if (kind === '1') {
            // 本地文件系统
            state.form.structDataTarget.local = Object.assign({}, state.form.structDataTarget.local, params);
        } else if (kind === '2') {
            // hdfs文件系统
            state.form.structDataTarget.hdfs = Object.assign({}, state.form.structDataTarget.hdfs, params);
        } else {
            // sql database
            state.form.structDataTarget.sql = Object.assign({}, state.form.structDataTarget.sql, params);
        }
    },
    SET_STRUCT_DATA_PRE_PROCESS(state, data) {
        state.form.structDataPreProcessing = Object.assign({}, state.form.structDataPreProcessing, data);
    },
    RESET_DATASET_STORE(state) {
        let tmp = initState();
        Object.keys(tmp).forEach(item => {
            state[item] = tmp[item];
        });
    },
    SET_CREATING_FLAG(state, flag) {
        state.isCreating = !!flag;
    },
    SET_DATA_SOURCE(state, params) {
        let isSourceChange = false;
        if (params.sourceType !== state.form.dataSource.sourceType) {
            isSourceChange = true;
        }
        state.form.dataSource.sourceType = params.sourceType;
        isSourceChange = !compareObject(state.form.dataSource, params);
        state.form.dataSource = Object.assign({}, state.form.dataSource, params);
        // 每次更改数据源，都清空第四步中缓存的schema，以确保在修改了数据源之后重新生成schema
        if (isSourceChange) {
            state.form.structDataSetting.schemaList = [];
            state.form.structDataSetting.schemaChanged = false;
            state.form.structDataPreProcessing.schemaActions = [];
        }
    }
};

const actions = {
    prevStep({ commit }) {
        if (state.currentStep > 0) {
            commit('UPDATE_CURRENT_STEP', state.currentStep - 1);
        } else {
            return 'disabled';
        }
    },
    nextStep({ commit }) {
        if (state.currentStep < getters.stepLength() - 1) {
            commit('UPDATE_CURRENT_STEP', state.currentStep + 1);
        } else {
            return 'disabled';
        }
    },
    setDatasetCreatingType({ commit }, type) {
        commit('SET_CREATING_TYPE', type);
    },
    setDatasetBaseInfo({ commit }, data) {
        commit('SET_DATASET_BASEINFO', data);
    },
    setDataService({ commit }, data) {
        commit('SET_DATA_SERVICE', data);
    },
    resetDatasetStore({ commit }) {
        commit('RESET_DATASET_STORE');
    },
    setCreatingFlag({ commit }, flag) {
        commit('SET_CREATING_FLAG', flag);
    },
    setNonStructDataSource({ commit }, { params, type }) {
        commit('SET_NON_STRUCT_DATA_SOURCE', { params, type });
    },
    setNonStructDataTarget({ commit }, { params, type }) {
        commit('SET_NON_STRUCT_DATA_TARGET', { params, type });
    },
    setStructDataSource({ commit }, { params, type }) {
        commit('SET_STRUCT_DATA_SOURCE', { params, type });
    },
    setStructDataSetting({ commit }, params) {
        commit('SET_STRUCT_DATA_SETTING', params);
    },
    setStructDataTarget({ commit }, { params, type }) {
        commit('SET_STRUCT_DATA_TARGET', { params, type });
    },
    setStructDataPreProcess({ commit }, data) {
        commit('SET_STRUCT_DATA_PRE_PROCESS', data);
    }
};

export default {
    state,
    mutations,
    actions,
    getters
};
