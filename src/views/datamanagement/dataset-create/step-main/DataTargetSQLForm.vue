<template>
    <div class="data-target-sql-form">
        <el-form
            :model="params"
            :rules="rules"
            label-width="110px"
            ref="form"
            label-position="left"
        >
            <el-form-item label="">
                <DatabaseAccessTest
                    ref="accessTest"
                    :source-id="targetDatasource"
                />
            </el-form-item>
            <el-form-item
                label="存储方式："
                prop="saveType"
            >
                <el-select
                    v-model="params.saveType"
                    style="width: 100%;"
                    placeholder="请选择存储方式"
                >
                    <el-option
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                        v-for="item in SAVE_TYPE_OPTIONS"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="表名："
                prop="tableName"
            >
                <el-select
                    v-model="params.tableName"
                    filterable
                    allow-create
                    default-first-option
                    style="width: 100%;"
                    placeholder="请选择或输入表名"
                >
                    <el-option
                        v-for="item in tableNameList"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                </el-select>
                <a
                    @click="fetchDBTables"
                    title="刷新"
                    style="position: absolute;right: -25px;top: 1px;color: #606266;font-size: 16px;"
                    v-if="params.saveType !== 'new'"
                >
                    <i
                        class="el-icon-refresh"
                        v-show="!isFetchingOptions"
                    />
                    <i
                        v-show="isFetchingOptions"
                        class="el-icon-loading"
                    />
                </a>
            </el-form-item>
            <el-form-item
                label="数据集共享："
                prop="rights"
                :required="true"
            >
                <SdxwShareForm
                    :default-users.sync="params.sharedUsers"
                    :default-groups.sync="params.sharedGroups"
                    :default-share-type.sync="params.shareType"
                    :sync="true"
                    source-kind="dataset"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import StepChangeHooks from './mixins/StepChangeHooks';
import SQLTestMixin from './mixins/SQLTestMixin';
import { mapActions } from 'vuex';
import { DRIVER_CLASSES, SAVE_TYPE_OPTIONS } from '../config';
import FormTip from '../../../datas/rely/SkyForm/FormTip';
import DatabaseAccessTest from '../../datasource/DatabaseAccessTest';
import SdxwShareForm from '@sdx/widget/lib/share-form';

export default {
    name: 'DataTargetSQLForm',
    mixins: [StepChangeHooks, SQLTestMixin],
    components: { FormTip, DatabaseAccessTest, SdxwShareForm },
    props: {
        source: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tableNameList: [],
            params: {
                tableName: this.$store.state.dataset.form.structDataTarget.sql.tableName || '',
                saveType: this.$store.state.dataset.form.structDataTarget.sql.saveType || SAVE_TYPE_OPTIONS[0].value,
                rights: this.$store.state.dataset.form.structDataTarget.sql.rights || '1',
                sharedUsers: this.$store.state.dataset.form.structDataTarget.sql.sharedUsers || [],
                sharedGroups: this.$store.state.dataset.form.structDataTarget.sql.sharedGroups || [],
                shareType: this.$store.state.dataset.form.structDataTarget.sql.shareType || 'PRIVATE'
            },
            rules: {
                tableName: [
                    { required: true, message: '请输入表名', trigger: 'change' }
                ],
                saveType: [
                    { required: true, message: '请选择存储方式', trigger: 'change' }
                ]
            },
            SAVE_TYPE_OPTIONS
        };
    },
    computed: {
        schemaColumns() {
            return this.$store.state.dataset.form.structDataSetting.schemaList.map(item => ({ label: item.fieldName, value: item.fieldName }));
        },
        targetDatasource() {
            return this.source.split('@')[1];
        }
    },
    methods: {
        ...mapActions([
            'setStructDataTarget'
        ]),
        syncStore() {
            this.setStructDataTarget({
                params: this.params,
                type: this.$parent.targetType
            });
        },
        beforeNextStep() {
            const self = this;
            return new Promise((resolve, reject) => {
                this.$refs.form.validate().then(res => {
                    self.$refs.accessTest.testConnection().then(() => {
                        this.syncStore();
                        resolve(res);
                    }, reject);
                }, reject);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .data-target-sql-form {
        .sql-box {
            margin-left: -100px;
            margin-right: -100px;
            border-top: 1px solid #dedede;
            padding: 30px 100px;
        }
        .connection-tip {
            margin-left: 10px;
            font-size: 12px;
            i {
                margin-right: 5px;
            }
            &.success {
                color: #13ce66;
            }
            &.fail {
                color: #ff4d51;
            }
        }
    }
</style>
