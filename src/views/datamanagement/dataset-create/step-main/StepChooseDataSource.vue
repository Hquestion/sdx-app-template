<template>
    <div class="step-choose-data-source">
        <!--<div class="step-header">-->
        <!--<el-radio-group v-model="sourceType">-->
        <!--<el-radio label="1">-->
        <!--本地文件系统-->
        <!--</el-radio>-->
        <!--<el-radio label="2">-->
        <!--HDFS-->
        <!--</el-radio>-->
        <!--<el-radio label="3">-->
        <!--SQL DataBase-->
        <!--</el-radio>-->
        <!--</el-radio-group>-->
        <!--</div>-->
        <!--<div class="step-body">-->
        <!--<keep-alive>-->
        <!--<component-->
        <!--:is="comp"-->
        <!--class="form-comp"-->
        <!--ref="comp"-->
        <!--/>-->
        <!--</keep-alive>-->
        <!--</div>-->
        <SkyForm
            class="step-choose-data-source-form"
            ref="chooseDataSourceForm"
            v-bind="formData"
        />
    </div>
</template>

<script>
import StepChangeHooks from './mixins/StepChangeHooks';
import SkyForm from '../../../datas/rely/SkyForm';
import { SkyFormMain } from '../../../datas/rely/SkyFormJs/SkyFormMain';
import { SkyFormItem } from '../../../datas/rely/SkyFormJs/SkyFormItem';
import Validator from '../../../datas/rely/validator/Validator';
import { DATASET_SOURCE_OPTIONS, FILE_TYPES, CSV_FILE_SPLITOR, QUOTE, CHARSET, ESCAPE, SOURCE_SYSTEM_MAP, DATASET_SOURCE_SYSTEM_MAP } from '../config';
import { FILE_SUFFIX_FORMAT_MAP } from '../../datasource/datasource.config';
import { getDataSourceOptions, fetchDbTablesBySource } from '../../../datas/rely/dataSourceApi';
import { mapActions, mapMutations } from 'vuex';
import DatabaseAccessTest from '../../datasource/DatabaseAccessTest';
import HdfsSelect from '../../../datas/rely/SkyForm/InputWidgets/HdfsSelect';
import Vue from 'vue';
Vue.component(DatabaseAccessTest.name, DatabaseAccessTest);
Vue.component(HdfsSelect.name, HdfsSelect);

export default {
    name: 'StepChooseDataSource',
    mixins: [StepChangeHooks],
    components: {
        SkyForm
    },
    data() {
        const self = this;
        return {
            formData: new SkyFormMain({
                list: [
                    new SkyFormItem({
                        label: '数据源：',
                        prop: 'sourceType',
                        value: '',
                        inputType: 'SELECT',
                        placeholder: '请选择数据源',
                        validator: [
                            new Validator({ required: true, message: '请选择数据源', trigger: 'change' }, true)
                        ],
                        options(model) {
                            return new Promise((resolve, reject) => {
                                getDataSourceOptions().then(res => {
                                    res = res.data;
                                    let sourceOptions = _.cloneDeep(DATASET_SOURCE_OPTIONS);
                                    Object.entries(DATASET_SOURCE_SYSTEM_MAP).forEach(([k, v]) => {
                                        let options = res.options.filter(item => item.kind === k);
                                        sourceOptions.find(item => item.value === v).options = options;
                                    });
                                    if (self.$store.state.dataset.form.dataSource.sourceType) {
                                        this.value = self.$store.state.dataset.form.dataSource.sourceType;
                                    } else {
                                        this.value = sourceOptions[0].value + '@' + (sourceOptions[0].options.length ? sourceOptions[0].options[0].value : '');
                                    }
                                    this.options = sourceOptions;
                                    resolve(sourceOptions);
                                }, reject);
                            });
                        },
                        widgetParams: {
                            isGroup: true
                        }
                    }),
                    new SkyFormItem({
                        label: '文件路径：',
                        prop: 'hdfsFile',
                        value: self.$store.state.dataset.form.dataSource.hdfsFile || [],
                        // eslint-disable-next-line
                        vNode(h: any, model: any) {
                            const { sourceType } = model;
                            const sourceKind = sourceType.split('@')[0];
                            const sourceId = sourceType.split('@')[1];
                            return (
                                <HdfsSelect source={sourceKind === '2' && sourceId || ''}
                                    vModel={this.value}
                                    fullpath={true}
                                    is-single-check={false}
                                    rich-model={true}
                                    can-check-folder={true}/>
                            );
                        },
                        validator: [
                            new Validator({ required: true, message: '请输入文件路径', trigger: 'blur' }, true)
                        ],
                        hide(model) {
                            return model.sourceType.split('@')[0] !== '2';
                        }
                    }),
                    new SkyFormItem({
                        label: '选择文件：',
                        prop: 'file',
                        value: self.$store.state.dataset.form.dataSource.file || [],
                        // eslint-disable-next-line
                        vNode(h: any, model: any) {
                            const { sourceType } = model;
                            const sourceKind = sourceType.split('@')[0];
                            const sourceId = sourceType.split('@')[1];
                            return (
                                <SdxwFileSelect vModel={this.value} limit={-1}/>
                            );
                        },
                        validator: [
                            new Validator({ required: true, message: '请选择文件', trigger: 'blur' }),
                            { validator(rule, value, cb) {
                                if (typeof value === 'string') {
                                    value.trim() !== '' ? cb() : cb('请选择文件');
                                } else {
                                    value.length > 0 ? cb() : cb('请选择文件');
                                }
                            }, trigger: 'blur' }
                        ],
                        renderIgnore(model) {
                            return model.sourceType.split('@')[0] !== '1';
                        },
                        hide(model) {
                            return model.sourceType.split('@')[0] !== '1';
                        }
                    }),

                    new SkyFormItem({
                        label: '文件类型：',
                        prop: 'fileType',
                        value: self.$store.state.dataset.form.dataSource.fileType || 'OTHER',
                        inputType: 'SELECT',
                        placeholder: '请选择文件类型',
                        validator: [
                            new Validator({ required: true, message: '请选择文件类型', trigger: 'change' })
                        ],
                        options: FILE_TYPES.map(item => ({ label: item, value: item })),
                        widgetParams: {
                            isGroup: false
                        },
                        hide(model) {
                            return model.sourceType.split('@')[0] === '3';
                        }
                    }),
                    new SkyFormItem({
                        label: '',
                        prop: 'dbtest',
                        value: '',
                        vNode(h: any, model: any) {
                            const sourceId = model.sourceType.split('@')[1];
                            return (
                                <DatabaseAccessTest source-id={sourceId}/>
                            );
                        },
                        hide(model) {
                            return model.sourceType.split('@')[0] !== '3';
                        }
                    }),
                    new SkyFormItem({
                        label: '表名：',
                        prop: 'tableName',
                        value: self.$store.state.dataset.form.dataSource.tableName || '',
                        inputType: 'SELECT',
                        validator: [
                            new Validator({ required: true, message: '请选择表名', trigger: 'blur' })
                        ],
                        options(model) {
                            const sourceType = model.sourceType;
                            const sourceKind = sourceType.split('@')[0];
                            const sourceId = sourceType.split('@')[1];
                            if (this.lastSourceId === sourceId) {
                                return;
                            }
                            return new Promise((resolve, reject) => {
                                if (sourceKind === '3') {
                                    fetchDbTablesBySource(sourceId).then(res => {
                                        this.lastSourceId = sourceId;
                                        if (!res.table_name.includes(this.value)) {
                                            this.value = res.table_name[0];
                                        }
                                        let options = res.table_name.map(item => ({
                                            label: item,
                                            value: item
                                        }));
                                        resolve(options);
                                    }, () => {
                                        this.lastSourceId = '';
                                        this.value = '';
                                        reject();
                                    });
                                } else {
                                    this.lastSourceId = '';
                                    this.value = '';
                                    reject();
                                }
                            });
                        },
                        hide(model) {
                            return model.sourceType.split('@')[0] !== '3';
                        }
                    }),
                    new SkyFormItem({
                        label: 'SQL：',
                        prop: 'sql',
                        value: self.$store.state.dataset.form.dataSource.sql || '',
                        inputType: 'TEXTAREA',
                        validator: [],
                        hide(model) {
                            return model.sourceType.split('@')[0] !== '3';
                        }
                    }),
                    new SkyFormItem({
                        label: '首行Schema：',
                        prop: 'firstLineAsSchema',
                        value: _.isUndefined(self.$store.state.dataset.form.dataSource.firstLineAsSchema) ? false : self.$store.state.dataset.form.dataSource.firstLineAsSchema,
                        inputType: 'SWITCH',
                        widgetParams: {
                            width: 40
                        },
                        hide: self.isHideConfig.bind(self)
                    }),
                    new SkyFormItem({
                        label: '分隔符：',
                        prop: 'splitor',
                        value: self.$store.state.dataset.form.dataSource.splitor || ',',
                        inputType: 'SELECT',
                        placeholder: '请选择分隔符',
                        options: CSV_FILE_SPLITOR,
                        hide: self.isHideConfig.bind(self)
                    }),
                    new SkyFormItem({
                        label: '引用字符：',
                        prop: 'quote',
                        value: self.$store.state.dataset.form.dataSource.quote || '"',
                        inputType: 'SELECT',
                        placeholder: '请选择引用字符',
                        options: QUOTE,
                        hide: self.isHideConfig.bind(self)
                    }),
                    new SkyFormItem({
                        label: '转义字符：',
                        prop: 'escape',
                        value: self.$store.state.dataset.form.dataSource.escape || '\\',
                        inputType: 'SELECT',
                        placeholder: '请选择转义字符',
                        options: ESCAPE,
                        hide: self.isHideConfig.bind(self)
                    }),
                    new SkyFormItem({
                        label: '数据集编码：',
                        prop: 'charset',
                        value: self.$store.state.dataset.form.dataSource.charset || 'UTF-8',
                        inputType: 'SELECT',
                        placeholder: '请选择数据集编码',
                        validator: [
                            new Validator({ required: true, message: '请选择数据集编码', trigger: 'change' })
                        ],
                        options: CHARSET,
                        hide: self.isHideConfig.bind(self)
                    })
                ],
                appendFooter: false,
                labelWidth: '120px',
                labelPosition: 'left'
            })
        };
    },
    computed: {
        chooseDataSourceForm() {
            return this.$refs.chooseDataSourceForm;
        }
    },
    methods: {
        ...mapActions([
            'setStructDataSource',
            'setDatasetCreatingType'
        ]),
        ...mapMutations([
            'SET_DATA_SOURCE'
        ]),
        isHideConfig(model) {
            let kind = model.sourceType.split('@')[0];
            if (['1', '2'].includes(kind)) {
                if (['CSV', 'TXT'].includes(model.fileType)) {
                    if (kind === '1') {
                        return model.file.length === 0 || model.file.length !== 1 || model.file[0].isDir;
                    } else {
                        return model.hdfsFile.length === 0 || model.hdfsFile.length !== 1 || model.hdfsFile[0].is_dir;
                    }
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        syncFileType(file, oldFile) {
            if (_.differenceBy(file, oldFile, 'name').length === 0 && _.differenceBy(oldFile, file, 'name').length === 0) return;
            if (!file) return;
            let type = 'OTHER';
            if (file.length !== 1) {
                type = 'OTHER';
            } else {
                if (file[0].isDir) {
                    type = 'OTHER';
                } else {
                    let suffixList = file[0].name.split('.');
                    let suffix = suffixList[suffixList.length - 1];
                    type = suffix && FILE_SUFFIX_FORMAT_MAP[suffix.toLowerCase()] || 'OTHER';
                }
            }
            this.formData.setValueByProp('fileType', type);
        },
        beforeNextStep() {
            return new Promise((resolve, reject) => {
                this.chooseDataSourceForm.validate().then(() => {
                    this.syncStore();
                    resolve();
                }, reject);
            });
        },
        syncStore() {
            const model = this.chooseDataSourceForm.getModel();
            let kind = model.sourceType.split('@')[0];
            this.SET_DATA_SOURCE(model);
            if (['1', '2'].includes(kind)) {
                if (model.fileType === 'OTHER') {
                    this.setDatasetCreatingType('NON_STRUCT');
                } else {
                    if ((kind === '1' && (model.file.length > 1 || model.file.length === 0 || model.file[0].isDir)) ||
                        (kind === '2' && (model.hdfsFile.length > 1 || model.hdfsFile.length === 0 || model.hdfsFile[0].is_dir))) {
                        this.setDatasetCreatingType('NON_STRUCT');
                    } else {
                        this.setDatasetCreatingType('STRUCT');
                    }
                }
            } else {
                this.setDatasetCreatingType('STRUCT');
            }
        }
    },
    mounted() {
        this.unwatch = this.$watch(() => {
            const model = this.$refs.chooseDataSourceForm.getModel();
            if (model.sourceType) {
                if (model.sourceType.split('@')[0] === '1') {
                    return model.file;
                } else if (model.sourceType.split('@')[0] === '2') {
                    return model.hdfsFile;
                }
            }
        }, this.syncFileType);
    },
    beforeDestroy() {
        this.unwatch && this.unwatch();
    }
};
</script>

<style lang="scss">
    .step-choose-data-source {
        padding: 0 !important;
        .step-header {
            text-align: center;
            height: 60px;
            line-height: 60px;
            box-shadow:0px 2px 0px 0px rgba(201,210,225,0.3);
            margin-top: -20px;
            .el-radio-group {
                width: 100%;
                .el-radio__label {
                    font-size:16px;
                    font-weight: bold !important;
                }
                .el-radio+.el-radio {
                    margin-left: 15%;
                }
            }
        }
        .step-body {
            padding: 30px;
            .form-comp {
                width: 100%;
                margin: 0 auto;
            }
        }
    }
</style>
