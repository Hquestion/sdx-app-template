<template>
    <div class="data-source-create">
        <sky-title-go-back />
        <SkyPanel class="data-source-panel">
            <div slot="header-left">
                {{ title }}
            </div>
            <SkyForm
                class="data-source-create-form"
                ref="dataSourceForm"
                v-bind="formData"
                :on-confirm="submitForm"
            />
        </SkyPanel>
    </div>
</template>

<script>
import SkyPanel from '../../datas/rely/SkyPanel';
import SkyForm from '../../datas/rely/SkyForm';
import { SkyFormMain } from '../../datas/rely/SkyFormJs/SkyFormMain';
import { SkyFormItem } from '../../datas/rely/SkyFormJs/SkyFormItem';
import Validator from '../../datas/rely//validator/Validator';
import { SOURCE_TYPES_OPTION, SQL_DATABASE_DRIVER_OPTION, SQL_SERVER_OPTION } from './datasource.config';
import DatabaseAccessTest from './DatabaseAccessTest';
import Vue from 'vue';
Vue.component('DatabaseAccessTest', DatabaseAccessTest);
import { createDataSource, dataSourceInfo, dataSourceUpdate, testDataSourceConnection } from '../../datas/rely/dataSourceApi';
import SkyTitleGoBack from '../../datas/rely/skyTitleGoBack';
export default {
    name: 'DataSourceCreate',
    components: {
        SkyTitleGoBack,
        SkyForm,
        SkyPanel
    },
    data() {
        const self = this;
        return {
            formData: new SkyFormMain({
                list: [
                    new SkyFormItem({
                        label: '数据源名称：',
                        prop: 'name',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入数据源名称',
                        validator: [
                            new Validator({ required: true, message: '请输入数据源名称', trigger: 'blur' }, false),
                            new Validator({ pattern: /^[a-zA-Z][a-zA-Z_0-9]{3,20}$/, message: '请输入4到20位，字母开头，数字、字母、下划线、点组成的字符串', trigger: 'blur' }, false)
                        ]
                    }),
                    new SkyFormItem({
                        label: '数据源种类：',
                        prop: 'sourceType',
                        value: 'SQL_DATABASE',
                        inputType: 'SELECT',
                        placeholder: '请选择数据源种类',
                        validator: [
                            new Validator({ required: true, message: '请选择数据源种类', trigger: 'change' }, false)
                        ],
                        options: SOURCE_TYPES_OPTION,
                        tooltip: '系统自带本地文件系统、平台ceph文件系统和HDFS数据源，此三种数据源无需手动创建。',
                        tooltipVisible: false,
                        formatter(value): string {
                            const opt: Object = SOURCE_TYPES_OPTION.find(item => item.value === value);
                            return opt && opt.label;
                        }
                    }),
                    new SkyFormItem({
                        label: '数据库种类：',
                        prop: 'databaseType',
                        value: SQL_SERVER_OPTION[0].value,
                        inputType: 'SELECT',
                        placeholder: '请选择数据库种类',
                        validator: [
                            new Validator({ required: true, message: '请选择数据库种类', trigger: 'change' }, false)
                        ],
                        options: SQL_SERVER_OPTION,
                        hide(model: Object): boolean {
                            return model.sourceType !== 'SQL_DATABASE';
                        }
                    }),
                    // new SkyFormItem({
                    //     label: 'Driver：',
                    //     prop: 'driver',
                    //     value: SQL_DATABASE_DRIVER_OPTION[0].value,
                    //     inputType: 'SELECT',
                    //     placeholder: '请选择数据库驱动',
                    //     validator: [
                    //         new Validator({ required: true, message: '请选择数据库驱动', trigger: 'change' }, false)
                    //     ],
                    //     options: SQL_DATABASE_DRIVER_OPTION,
                    //     hide(model: Object) {
                    //         return model.sourceType !== 'SQL_DATABASE';
                    //     }
                    // }),
                    // new SkyFormItem({
                    //     label: 'URL：',
                    //     prop: 'url',
                    //     value: '',
                    //     inputType: 'INPUT',
                    //     placeholder: '请输入数据库连接地址',
                    //     validator: [
                    //         new Validator({ required: true, message: '请输入数据库连接地址', trigger: 'blur' })
                    //     ],
                    //     hide(model: Object) {
                    //         return model.sourceType !== 'SQL_DATABASE';
                    //     }
                    // }),
                    new SkyFormItem({
                        label: 'HOST：',
                        prop: 'host',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入host',
                        validator: [
                            new Validator({ required: true, message: '请输入host', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'SQL_DATABASE';
                        }
                    }),
                    new SkyFormItem({
                        label: '端口：',
                        prop: 'db_port',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入端口',
                        validator: [
                            new Validator({ required: true, message: '请输入端口', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'SQL_DATABASE';
                        }
                    }),
                    new SkyFormItem({
                        label: '数据库：',
                        prop: 'db',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入数据库名称',
                        validator: [
                            new Validator({ required: true, message: '请输入数据库名称', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'SQL_DATABASE';
                        }
                    }),
                    new SkyFormItem({
                        label: '用户名：',
                        prop: 'username',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入数据库用户名',
                        validator: [
                            new Validator({ required: true, message: '请输入数据库用户名', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'SQL_DATABASE';
                        }
                    }),
                    new SkyFormItem({
                        label: '密码：',
                        prop: 'password',
                        value: '',
                        inputType: 'PASSWORD',
                        placeholder: '请输入数据库密码',
                        validator: [
                            new Validator({ required: true, message: '请输入数据库密码', trigger: 'blur' }, false)
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'SQL_DATABASE';
                        },
                        formatter(value) {
                            return value && value.replace(/./g, '*');
                        }
                    }),
                    new SkyFormItem({
                        label: 'IP：',
                        prop: 'ip',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入ip',
                        validator: [
                            new Validator({ required: true, message: '请输入ip', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'HDFS';
                        }
                    }),
                    new SkyFormItem({
                        label: '端口：',
                        prop: 'port',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入端口',
                        validator: [
                            new Validator({ required: true, message: '请输入端口', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'HDFS';
                        }
                    }),
                    new SkyFormItem({
                        label: '工作空间：',
                        prop: 'path',
                        value: '',
                        inputType: 'INPUT',
                        placeholder: '请输入工作空间',
                        validator: [
                            new Validator({ required: true, message: '请输入工作空间', trigger: 'blur' })
                        ],
                        hide(model: Object) {
                            return model.sourceType !== 'HDFS';
                        }
                    }),
                    new SkyFormItem({
                        label: '',
                        prop: 'dbtest',
                        value: '',
                        // eslint-disable-next-line
                        vNode(h) {
                            let attr = { onAccess: self.onAccess };
                            return (
                                <database-access-test {...{ attrs: { ...attr } }} />
                            );
                        },
                        hide(model: Object) {
                            return model.sourceType !== 'SQL_DATABASE';
                        }
                    })
                ],
                labelWidth: '120px',
                readonly: false,
                appendFooter: true
            })
        };
    },
    props: {
        id: {
            type: String,
            default: ''
        },
        read: {
            type: String,
            default: '0'
        }
    },
    computed: {
        isRead() {
            return this.id && this.read === '1';
        },
        isEdit() {
            return this.id && this.read !== '1';
        },
        isCreate() {
            return !this.id;
        },
        title() {
            if (this.isRead) {
                return '数据源详情';
            } else if (this.isEdit) {
                return '编辑数据源';
            } else {
                return '新建数据源';
            }
        }
    },
    methods: {
        init() {
            this.$route.meta.name = this.title;
            if (this.isRead) {
                // 如果是查看详情，则获取详情，并设置表单为只读模式
                this.formData.readonly = true;
                this.getDataSourceDetail().then(res => {
                    this.formData.setModel(res);
                });
            } else if (this.isEdit) {
                // 只有id时为编辑模式，需获取详情，并填充表单
                this.getDataSourceDetail().then(res => {
                    this.formData.setModel(res);
                    this.formData.readonly = false;
                });
            } else {
                // 创建时不需要做什么
            }
        },
        getDataSourceDetail(): Promise<any> {
            return new Promise((resolve, reject) => {
                dataSourceInfo(this.id).then(res => {
                    let model = {
                        name: res.name,
                        sourceType: res.kind,
                        databaseType: res.kind_type,
                        driver: res.params.driver,
                        username: res.params.username,
                        password: res.params.password,
                        url: res.params.url,
                        ip: res.params.host,
                        port: res.params.port,
                        path: res.params.path,
                        db: res.params.database,
                        db_port: res.params.port,
                        host: res.params.host
                    };
                    resolve(model);
                }, reject);
            });
        },
        submitForm(model: Object) {
            // pass
            if (this.isRead) {
                this.$router.go(-1);
                return;
            }
            const param: Object = {
                name: model.name,
                kind: model.sourceType,
                params: {
                    db: '',
                    path: ''
                }
            };
            const SQL_PARAMS: Object = {
                kind_type: model.databaseType,
                params: {
                    // driver: model.driver,
                    username: model.username,
                    password: model.password,
                    // url: model.url,
                    host: model.host,
                    port: model.db_port,
                    database: model.db
                }
            };
            const HDFS_PARAMS: Object = {
                params: {
                    host: model.ip,
                    port: +model.port,
                    path: model.path
                }
            };
            const KIND_MAP: Object = {
                SQL_DATABASE: SQL_PARAMS,
                HDFS: HDFS_PARAMS
            };
            if (this.id) {
                param.datasource = this.id;
                dataSourceUpdate(Object.assign({}, param, KIND_MAP[model.sourceType])).then(res => {
                    this.$message.success('数据源更新成功');
                    this.$router.go(-1);
                });
            } else {
                let temp = Object.assign({}, param, KIND_MAP[model.sourceType]);
                delete temp.datasource;
                createDataSource(temp).then(res => {
                    this.$message.success('数据源创建成功');
                    this.$router.go(-1);
                });
            }
        },
        onAccess(): Promise<any> {
            return new Promise((resolve, reject) => {
                const model = this.$refs.dataSourceForm.getModel();
                this.$refs.dataSourceForm.validateFields(['username', 'password', 'host', 'db_port', 'db']).then(() => {
                    testDataSourceConnection({
                        // datasource: '',
                        kind: model.sourceType,
                        kind_type: model.databaseType || null,
                        driver: model.driver || null,
                        host: model.host || null,
                        port: model.db_port || null,
                        database: model.db,
                        username: model.username,
                        password: model.password,
                        path: ''
                    }).then(resolve, reject);
                }, () => {
                    reject('VALIDATE_ERROR');
                });
            });
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="scss" scoped>
    .data-source-create {
        height: 100%;
        .data-source-panel {
            height: calc(100% - 50px);
            .data-source-create-form {
                min-height: calc(100vh - 200px);;
                width: auto;
                margin: 0 auto;
                padding: 50px calc(50% - 320px) 62px;
            }
        }
    }
</style>
