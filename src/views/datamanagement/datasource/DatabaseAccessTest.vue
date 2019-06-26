/* @flow
<template>
    <div class="database-access-test">
        <el-button
            size="small"
            type="primary"
            @click="testConnection"
            :loading="isTesting"
        >
            &emsp;测试&emsp;
        </el-button>
        <span
            class="connection-tip success"
            v-if="connectStatus === 'success'"
        >
            <i class="el-icon-success" />连接成功
        </span>
        <span
            class="connection-tip fail"
            v-if="connectStatus === 'fail'"
        >
            <i class="el-icon-error" />连接失败
        </span>
    </div>
</template>
*/
// <!--eslint-disable-next-line-->
// <script>
import { testDataSourceConnection } from '../../datas/rely/dataSourceApi';
export default {
    name: 'DatabaseAccessTest',
    data() {
        return {
            isTesting: false,
            connectStatus: ''
        };
    },
    computed: {
        parentForm() {
            return this.$parent.$parent;
        },
        model() {
            return this.parentForm.model;
        }
    },
    props: {
        sourceId: {
            type: String,
            default: ''
        },
        sourceProps: {
            type: Array,
            default: () => ['url', 'username', 'password', 'driver']
        },
        onAccess: {
            type: Function,
            default: undefined
        }
    },
    methods: {
        validateField(field) {
            return new Promise((resolve, reject) => {
                this.parentForm.validateField(field, msg => {
                    if (msg) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
        },
        testConnection() {
            if (this.sourceId) {
                return new Promise((resolve, reject) => {
                    this.isTesting = true;
                    testDataSourceConnection({
                        datasource: this.sourceId
                    }).then(() => {
                        this.connectStatus = 'success';
                        this.isTesting = false;
                        resolve('success');
                    }).catch(() => {
                        this.connectStatus = 'fail';
                        this.isTesting = false;
                        reject('fail');
                    });
                });
            } else {
                return new Promise((resolve, reject) => {
                    if (this.onAccess && typeof this.onAccess === 'function') {
                        this.isTesting = true;
                        this.onAccess().then(() => {
                            this.connectStatus = 'success';
                            this.isTesting = false;
                            resolve('success');
                        }, notAccessError => {
                            if (notAccessError === 'VALIDATE_ERROR') {
                                this.isTesting = false;
                            } else {
                                this.connectStatus = 'fail';
                                this.isTesting = false;
                                reject('fail');
                            }
                        });
                    } else {
                        reject('fail');
                    }
                });
            }
        }
    }
};
// </script>

/*
<style lang="scss" scoped>
    .database-access-test {
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
*/
