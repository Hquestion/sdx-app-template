<template>
    <div class="data-source-sql-form">
        <el-form
            :model="params"
            :rules="rules"
            label-width="100px"
            ref="form"
            label-position="left"
        >
            <el-form-item
                label="URL"
                prop="url"
            >
                <el-input
                    v-model="params.url"
                    placeholder="请输入url"
                />
            </el-form-item>
            <el-form-item
                label="用户名"
                prop="username"
            >
                <el-input
                    v-model="params.username"
                    placeholder="请输入用户名"
                />
            </el-form-item>
            <el-form-item
                label="密码"
                prop="password"
            >
                <el-input
                    type="password"
                    v-model="params.password"
                    placeholder="请输入密码"
                />
            </el-form-item>
            <el-form-item
                label="Driver Class"
                prop="driverClass"
            >
                <!--<el-input v-model="params.driverClass" placeholder="请输入驱动类型"></el-input>-->
                <el-select
                    v-model="params.driverClass"
                    style="width: 100%;"
                    placeholder="请选择驱动类型"
                >
                    <el-option
                        v-for="item in driverList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <!--<el-form-item label="Driver文件目录" prop="driverFile">-->
            <!--<PathSelector v-model="params.driverFile" @blur="$refs.form.validateField('driverFile')"/>-->
            <!--</el-form-item>-->
            <el-form-item label="">
                <el-button
                    size="small"
                    type="primary"
                    @click="testConnection"
                    :loading="testing"
                >
                    &emsp;测试&emsp;
                </el-button>
                <span
                    class="connection-tip success"
                    v-if="params.connectStatus === 'success'"
                >
                    <i
                        class="el-icon-success"
                    />连接成功
                </span>
                <span
                    class="connection-tip fail"
                    v-if="params.connectStatus === 'fail'"
                >
                    <i class="el-icon-error" />连接失败
                </span>
            </el-form-item>
            <div class="sql-box">
                <el-form-item
                    label="表名"
                    prop="tableName"
                >
                    <!--<el-input v-model="params.tableName" placeholder="请输入表名"></el-input>-->
                    <el-select
                        v-model="params.tableName"
                        style="width: 100%;"
                        placeholder="请选择表名"
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
                    label="SQL"
                    prop="sql"
                >
                    <el-input
                        v-model="params.sql"
                        :rows="4"
                        type="textarea"
                        placeholder="请输入SQL语句"
                    />
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
import PathSelector from './PathSelector';
import StepChangeHooks from './mixins/StepChangeHooks';
import SQLTestMixin from './mixins/SQLTestMixin';
import { mapActions } from 'vuex';
import { DRIVER_CLASSES } from '../config';

export default {
    name: 'DataSourceSQLForm',
    mixins: [StepChangeHooks, SQLTestMixin],
    components: {
        PathSelector
    },
    data() {
        return {
            params: {
                url: this.$store.state.dataset.form.structDataSource.sql.url || '',
                username: this.$store.state.dataset.form.structDataSource.sql.username || '',
                password: this.$store.state.dataset.form.structDataSource.sql.password || '',
                driverClass: this.$store.state.dataset.form.structDataSource.sql.driverClass || '',
                driverFile: this.$store.state.dataset.form.structDataSource.sql.driverFile || '',
                sql: this.$store.state.dataset.form.structDataSource.sql.sql || '',
                connectStatus: this.$store.state.dataset.form.structDataSource.sql.connectStatus || '',
                tableName: this.$store.state.dataset.form.structDataSource.sql.tableName || '',
                tableNameList: []
            },
            rules: {
                url: [
                    {
                        required: true, message: '请输入url', trigger: 'blur', transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                username: [
                    {
                        required: true, message: '请输入用户名', trigger: 'blur', transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                password: [
                    {
                        required: true, message: '请输入密码', trigger: 'blur', transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                driverClass: [
                    { required: true, message: '请选择驱动类型', trigger: 'change' }
                ],
                tableName: [
                    { required: true, message: '请选择表名', trigger: 'change' }
                ]
                // driverFile: [
                //     { required: true, message: '请选择驱动文件路径', trigger: 'blur' }
                // ]
            }
        };
    },
    computed: {
        driverList() {
            return DRIVER_CLASSES.map(item => ({ label: item, value: item }));
        }
    },
    methods: {
        ...mapActions([
            'setStructDataSource'
        ]),
        syncStore() {
            this.setStructDataSource({
                params: this.params,
                type: '3'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .data-source-sql-form {
        .sql-box {
            margin-left: -100px;
            margin-right: -100px;
            border-top: 1px solid #dedede;
            padding: 30px 100px 0;
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
