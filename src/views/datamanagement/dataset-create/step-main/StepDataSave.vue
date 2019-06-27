<template>
    <div class="step-data-save">
        <!--<div class="step-header">-->
        <!--<el-radio-group v-model="targetType">-->
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
        <ElForm
            :model="model"
            label-width="110px"
            style="padding: 0 30px;"
            label-position="left"
        >
            <ElFormItem
                label="数据源："
                prop="targetType"
                :required="true"
            >
                <SkyFormWidgetSelect
                    :options="availableDataSource"
                    :is-group="true"
                    v-model="targetType"
                />
            </ElFormItem>
        </ElForm>
        <div class="step-body">
            <keep-alive>
                <component
                    :is="comp"
                    class="form-comp"
                    :source="targetType"
                    ref="comp"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import DataTargetFileForm from './DataTargetFileForm';
import DataTargetHDFSForm from './DataTargetHDFSForm';
import DataTargetSQLForm from './DataTargetSQLForm';
import StepChangeHooks from './mixins/StepChangeHooks';
import SkyFormWidgetSelect from '../../../../components/SkyForm/InputWidgets/SkyFormWidgetSelect';
const compMap = ['', 'DataTargetFileForm', 'DataTargetHDFSForm', 'DataTargetSQLForm'];
import { DATA_SOURCE_OPTIONS, SOURCE_SYSTEM_MAP } from '../config';
import { getDataSourceOptions } from '../../../datas/rely/dataSourceApi';

export default {
    name: 'StepDataSave',
    mixins: [StepChangeHooks],
    components: {
        SkyFormWidgetSelect,
        DataTargetFileForm,
        DataTargetHDFSForm,
        DataTargetSQLForm
    },
    data() {
        return {
            targetType: this.$store.state.dataset.form.structDataTarget.targetType,
            availableDataSource: []
        };
    },
    computed: {
        comp() {
            return this.targetType && compMap[this.targetType.split('@')[0]];
        },
        model() {
            return {
                targetType: this.targetType
            };
        }
    },
    methods: {
        initTargetTypeOptions() {
            getDataSourceOptions().then(res => {
                res = res.data;
                let sourceOptions = _.cloneDeep(DATA_SOURCE_OPTIONS);
                Object.entries(SOURCE_SYSTEM_MAP).forEach(([k, v]) => {
                    let options = res.options.filter(item => item.kind === k);
                    sourceOptions.find(item => item.value === v).options = options;
                });
                this.availableDataSource = sourceOptions.map(item => {
                    if (this.isStruct) {
                        return item;
                    } else {
                        if (item.value === '3') {
                            item.disabled = true;
                            return item;
                        }
                        return item;
                    }
                });
                this.targetType = this.availableDataSource[0].value + '@' + this.availableDataSource[0].options[0].value;
            });
        }
    },
    mounted() {
        this.initTargetTypeOptions();
    }
};
</script>

<style lang="scss">
    .step-data-save {
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
            padding: 0 30px 30px 30px;
            .form-comp {
                width: 100%;
                margin: 0 auto;
            }
        }
    }
</style>
