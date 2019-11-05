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
        .el-steps {
    .el-step {
        &.is-center {
            .el-step__line {
                height: 4px;
                background: #1999F7;
                left: calc(50% + 30px);
                right: calc(-50% + 30px);
                top: 19px;
            }
        }
        &.is-vertical {
            .el-step__head {
                width: 28px;
                .el-step__icon {
                    width: 28px;
                    height: 28px;
                    font-size: 12px;
                }
                .el-step__line {
                    left: 14px;
                    top: 38px;
                    bottom: 10px;
                }
                &.is-wait {
                    .el-step__icon {
                        background: #fff;
                        border: 1px solid #c4c0cc;
                    }
                }
                &.is-success {
                    .el-step__icon {
                        background: #fff;
                        border: 2px solid #1999F7;
                        color: #1999F7;
                    }
                }
            }
            .el-step__main {
                margin-left: 10px;
                .el-step__title {
                    margin-top: 5px;
                }
            }
        }
        .el-step__head{
            .el-step__icon {
                width: 44px;
                height: 44px;
                background: #ECF6FF;
                color: #fff;
                border: none;
                font-size:24px;
                font-family:siyuan;font-weight:400;;
                line-height:31px;
            }
            &.is-process {
                .el-step__icon {
                    background: #1999F7;
                    color: #fff;
                }
                .el-step__line {
                    background: #F2F3F5;
                }
            }
            &.is-wait {
                .el-step__line {
                    background: #F2F3F5;
                }
                .el-step__icon {
                    background: #F2F3F5;
                    color: #C0C4CC;
                }
            }
            &.is-finish {
                .el-step__icon {
                    background: #1999F7;
                    color: #fff;
                }
            }
            &.is-success {
                color: #1999F7;
                border: none;
                .el-step__icon {
                    background: #1999F7;
                    color: #fff;
                }
            }
        }
        .el-step__main {
            .el-step__title{
                color: #6E7074;
                line-height: 19px;
                margin-top: 18px;
                font-size: 14px;
                &.is-finish, &.is-success {
                    color: #1999F7;
                }
                &.is-process {
                    color: #1999F7;
                    font-weight: bold !important;
                }
            }
        }
    }
}
    }
</style>
