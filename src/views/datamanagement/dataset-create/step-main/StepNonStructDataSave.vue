<template>
    <div class="step-non-struct-data-save">
        <div class="step-header">
            <el-radio-group v-model="targetType">
                <el-radio label="1">
                    本地文件系统
                </el-radio>
                <el-radio label="2">
                    HDFS
                </el-radio>
            </el-radio-group>
        </div>
        <div class="step-body">
            <keep-alive>
                <component
                    :is="comp"
                    class="form-comp"
                    ref="comp"
                />
            </keep-alive>
        </div>
    </div>
</template>

<script>
import DataNonStructTargetFileForm from './DataNonStructTargetFileForm';
import DataNonStructTargetHDFSForm from './DataNonStructTargetHDFSForm';
import StepChangeHooks from './mixins/StepChangeHooks';
const compMap = ['', 'DataNonStructTargetFileForm', 'DataNonStructTargetHDFSForm'];
export default {
    name: 'StepNonStructDataSave',
    mixins: [StepChangeHooks],
    components: {
        DataNonStructTargetFileForm,
        DataNonStructTargetHDFSForm
    },
    data() {
        return {
            targetType: '1'
        };
    },
    computed: {
        comp() {
            return compMap[this.targetType];
        }
    }
}
</script>

<style lang="scss">
    .step-non-struct-data-save {
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
