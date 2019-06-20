<template>
    <div class="dataset-step-bar shadow">
        <div class="dataset-step-bar-main">
            <el-steps
                :active="currentStep"
                align-center
                finish-status="success"
            >
                <el-step
                    :title="item.title"
                    v-for="(item, index) in stepList"
                    :key="index"
                    :class="index+1===currentStep?'current-item':'success-item'"
                />
            </el-steps>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import config from './config';
export default {
    name: 'StepBar',
    computed: {
        ...mapState({
            stepList(state) {
                return config.steps[state.dataset.creatingType];
            },
            currentStep(state) {
                return state.dataset.currentStep;
            }
        })
    }
};
</script>

<style lang="scss">
    @import "../../../assets/styles/base/colors";
    @import "../../../assets/styles/base/constants";
    @import "../../../assets/styles/base/mixin";
    .dataset-step-bar {
        height: 154px;
        display: flex;
        align-items: center;
        background: #fff;
        border: 1px solid #E6E9F1;
        .dataset-step-bar-main {
            flex: 1;
        }
        .is-success .el-step__icon {
            border: 2px solid #1999F7 !important;
            background: #fff !important;
            .el-step__icon-inner{
                color:#1999F7;
            }
        }
        .current-item .is-success .el-step__line {
            background:#1999F7 !important;
            .el-step__line-inner{
                color:#1999F7 !important;
            }
        }
        .success-item .is-success .el-step__line {
             background:rgba(25,153,247,0.5) !important;
            .el-step__line-inner{
                color:#1999f703 !important;
            }
        }
    }
</style>
