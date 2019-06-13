import { fileTypeMap, samplingTypeMap, shareKindMap, DATA_FORMAT_MAP } from '../../config';

export default {
    methods: {
        makeSourceOption() {
            let { sourceType, fileType, charset, file, hdfsFile, splitor, firstLineAsSchema, quote, escape, sql, tableName } = this.$store.state.dataset.form.dataSource;
            let sourceKind = sourceType.split('@')[0];
            let sourceId = sourceType.split('@')[1];
            let filePaths = (file || []).map(item => item.cephName && item.cephName || item);
            let hdfsPaths = (hdfsFile || []).map(item => item.fullpath && item.fullpath || item);
            let paths = ['', filePaths, hdfsPaths][sourceKind];
            if (paths && typeof paths === 'string') {
                paths = [paths];
            }
            return ({
                datasource: sourceId,
                paths,
                data_format: sourceKind === '3' ? 'JDBC' : DATA_FORMAT_MAP[fileType],
                coding: charset.toLowerCase(),
                first_header: firstLineAsSchema,
                column_sep: splitor,
                sql,
                table: tableName,
                csvQuote: quote,
                csvEscape: escape
            });
        },
        createGenerateSchemaReqParam() {
            let params = {
                data_service: this.$store.state.dataset.form.dataServiceInfo.dataService,
                sample_mode: samplingTypeMap[this.params.sampling],
                sample_num: this.params.samplingNum
            };
            params.source_option = this.makeSourceOption();
            return params;
        },
        createPreProcessReqParam() {
            let params = {
                data_service: this.$store.state.dataset.form.dataServiceInfo.dataService,
                name: this.$store.state.dataset.form.baseInfo.datasetName,
                sample_mode: samplingTypeMap[this.$store.state.dataset.form.structDataSetting.sampling],
                sample_num: this.$store.state.dataset.form.structDataSetting.samplingNum,
                sky_schema: this.$store.state.dataset.form.structDataSetting.schemaList,
                schema_changed: this.$store.state.dataset.form.structDataSetting.schemaChanged,
                process_actions: []
            };
            params.source_option = this.makeSourceOption();
            let processActions = [];
            let schemaActions = this.schemaActions;
            schemaActions.forEach(action => {
                let field = action[action.length - 1];
                let operation = action.slice(1, action.length - 1);
                let actionData = {
                    actionType: operation[0],
                    field,
                    operatorName: operation[1] || null,
                    operatorValue: operation[2] || null
                };
                processActions.push(actionData);
            });
            params.process_actions = processActions;
            return params;
        },
        createSaveRequestParam() {
            let params = {
                data_service: this.$store.state.dataset.form.dataServiceInfo.dataService,
                name: this.$store.state.dataset.form.baseInfo.datasetName,
                description: this.$store.state.dataset.form.baseInfo.datasetDesc,
                sample_mode: samplingTypeMap[this.$store.state.dataset.form.structDataSetting.sampling],
                sample_num: this.$store.state.dataset.form.structDataSetting.samplingNum,
                sky_schema: this.$store.state.dataset.form.structDataSetting.schemaList,
                schema_changed: this.$store.state.dataset.form.structDataSetting.schemaChanged,
                process_actions: [],
                is_dataframe: true,
                tags: this.$store.state.dataset.form.baseInfo.datasetLabel
            };
            params.source_option = this.makeSourceOption();
            let processActions = [];
            let schemaActions = this.$store.state.dataset.form.structDataPreProcessing.schemaActions;
            schemaActions.forEach(action => {
                let field = action[action.length - 1];
                let operation = action.slice(1, action.length - 1);
                let actionData = {
                    actionType: operation[0],
                    field,
                    operatorName: operation[1] || null,
                    operatorValue: operation[2] || null
                };
                processActions.push(actionData);
            });
            params.process_actions = processActions;
            let { targetType } = this.$store.state.dataset.form.structDataTarget;
            let targetKind = targetType.split('@')[0];
            let targetId = targetType.split('@')[1];
            let sink_option = {
                datasource: targetId,
                data_format: '',
                save_mode: '', // 存储模式, NEW, OVER_WRITE, APPEND
                partition: [],
                path: '',
                table: ''
            };
            let shareKind = '1';
            if (targetKind === '1') {
                shareKind = shareKindMap[this.$store.state.dataset.form.structDataTarget.local.rights];
                sink_option = {
                    ...sink_option,
                    data_format: this.$store.state.dataset.form.structDataTarget.local.fileType,
                    path: this.$store.state.dataset.form.structDataTarget.local.savePath.map(item => item.cephName).join(','),
                    // path: '/Users/chenxiaoliu/work/code/skyflow_new/src/rest/target/classes/csv/',
                    partition: this.$store.state.dataset.form.structDataTarget.local.partition,
                    save_mode: this.$store.state.dataset.form.structDataTarget.local.saveType
                }
            } else if (targetKind === '2') {
                const { fileType, savePath, partition, saveType, rights } = this.$store.state.dataset.form.structDataTarget.hdfs;
                let hdfsPath = savePath;
                shareKind = shareKindMap[rights];
                sink_option = {
                    ...sink_option,
                    data_format: fileType,
                    path: hdfsPath,
                    partition,
                    save_mode: saveType
                }
            } else {
                const { partition, saveType, tableName, rights } = this.$store.state.dataset.form.structDataTarget.sql;
                shareKind = shareKindMap[rights];
                sink_option = {
                    ...sink_option,
                    partition,
                    save_mode: saveType,
                    table: tableName,
                    data_format: 'JDBC'
                }
            }
            params.sink_option = sink_option;
            params.share_kind = shareKind;
            return params;
        },
        createNonStructSaveParam() {
            let params = {
                data_service: '',
                name: this.$store.state.dataset.form.baseInfo.datasetName,
                description: this.$store.state.dataset.form.baseInfo.datasetDesc,
                tags: this.$store.state.dataset.form.baseInfo.datasetLabel,
                sample_mode: '',
                sample_num: 0,
                sky_schema: [],
                schema_changed: false,
                process_actions: [],
                is_dataframe: false
            };
            params.source_option = this.makeSourceOption();
            let { targetType } = this.$store.state.dataset.form.structDataTarget;
            let targetKind = targetType.split('@')[0];
            let targetId = targetType.split('@')[1];
            let sink_option = {
                datasource: targetId,
                data_format: '',
                save_mode: '',
                partition: []
            };
            let shareKind = '';
            if (targetKind === '1') {
                shareKind = shareKindMap[this.$store.state.dataset.form.structDataTarget.local.rights];
                sink_option = {
                    ...sink_option,
                    path: this.$store.state.dataset.form.structDataTarget.local.savePath[0] && this.$store.state.dataset.form.structDataTarget.local.savePath[0].cephName
                }
            } else if (targetKind === '2') {
                const { savePath, rights } = this.$store.state.dataset.form.structDataTarget.hdfs;
                shareKind = shareKindMap[rights];
                sink_option = {
                    ...sink_option,
                    path: savePath
                }
            }
            params.sink_option = sink_option;
            params.share_kind = shareKind;
            return params;
        }
    }
}
