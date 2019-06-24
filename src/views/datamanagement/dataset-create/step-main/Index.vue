<template>
    <div class="step-main shadow">
        <div
            class="step-main-container"
            :class="containerWidth"
        >
            <div class="create-dataset-step-main">
                <keep-alive>
                    <transition :name="transitionName">
                        <component
                            :is="currentComp"
                            ref="comp"
                            class="comp-item"
                        />
                    </transition>
                </keep-alive>
            </div>
        </div>
        <StepSwitchTool
            @next="onNext"
            @prev="onPrev"
            @cancel="onCancel"
            @save="onSave"
            @revoke="onRevoke"
            :saving="isSaving"
            :revokable="$refs.comp && !!$refs.comp.revokable"
        />
    </div>
</template>

<script>
import StepChangeHooks from './mixins/StepChangeHooks';
import CreateRequestParamMixin from './mixins/CreateRequestParamMixin';
import StepBaseInfo from './StepBaseInfo';
import StepChooseDataService from './StepChooseDataService';
import StepChooseDataSource from './StepChooseDataSource';
import StepDataSetting from './StepDataSetting';
import StepDataPreprocessing from './StepDataPreprocessing';
import StepDataSave from './StepDataSave';
import StepNonStructChooseDataSource from './StepNonStructChooseDataSource';
import StepNonStructDataSave from './StepNonStructDataSave';
import { mapState, mapActions } from 'vuex';
import config from '../config';
import StepSwitchTool from '../StepSwitchTool';
import { createDataset } from '../../../datas/rely/dataSourceApi';

export default {
    name: 'Index',
    mixins: [StepChangeHooks, CreateRequestParamMixin],
    data() {
        return {
            transitionName: 'slide-right',
            containerWidth: 'padding',
            isSaving: false
        };
    },
    components: {
        StepSwitchTool,
        StepBaseInfo,
        StepChooseDataService,
        StepChooseDataSource,
        StepDataSetting,
        StepDataPreprocessing,
        StepDataSave,
        StepNonStructChooseDataSource,
        StepNonStructDataSave
    },
    computed: {
        ...mapState({
            creatingType: state => state.dataset.creatingType,
            currentStep: state => state.dataset.currentStep
        }),
        currentComp() {
            let comp = config.stepCompMap[this.creatingType][this.currentStep];
            this.$nextTick(() => {
                this.containerWidth = this.$refs.comp && this.$refs.comp.compWidth || 'padding';
            });
            return comp;
        }
    },
    methods: {
        ...mapActions([
            'prevStep',
            'nextStep',
            'resetDatasetStore'
        ]),
        onNext() {
            this.$refs.comp.beforeNextStep().then(() => {
                // 如果允许则跳转下一步
                this.nextStep();
            }, res => {
                console.log(res);
            });
        },
        onPrev() {
            this.prevStep();
        },
        onCancel() {
            if (this.$store.state.dataset.isCreating) {
                this.$confirm('当前正在创建数据集，退出将清空已填写的内容，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    closeOnHashChange: false
                }).then(() => {
                    this.resetDatasetStore();
                    this.$router.go(-1);
                }).catch(() => {
                    console.error('canceled');
                });
            } else {
                this.resetDatasetStore();
                this.$router.go(-1);
            }
        },
        onSave() {
            this.$refs.comp.beforeNextStep().then(() => {
                // 通过校验做保存操作
                console.log('TODO:', '即将保存数据');
                this.isSaving = true;
                let params;
                if (this.creatingType === 'STRUCT') {
                    params = this.createSaveRequestParam();
                } else {
                    params = this.createNonStructSaveParam();
                }
                createDataset(params).then(() => {
                    // 跳转数据集首页
                    this.isSaving = false;
                    this.resetDatasetStore();
                    this.$router.push('/datasManage/datasList');
                    this.$message.success('数据集开始创建');
                }).catch(err => {
                    this.isSaving = false;
                });
            });
        },
        onRevoke() {
            this.$refs.comp.onRevoke && this.$refs.comp.onRevoke();
        }
    },
    watch: {
        currentStep(val, oldVal) {
            this.transitionName = val < oldVal ? 'slide-left' : 'slide-right';
        }
    }
};
</script>

<style lang="scss" scoped>
    .step-main {
        /*min-height: calc(100vh - 96px - 70px - 154px);*/
        margin-top: 20px;
        background: #fff;
        border: 1px solid #E6E9F1;
        .step-main-container {
            width: 100%;
            min-height: calc(100vh - 472px);;
            padding: 0;
            margin: 0 auto;
            background: #fff;
            &.full {
                width: 100%;
                padding: 0;
                height: calc(100vh - 417px);
                .create-dataset-step-main {
                    width: 100%;
                    max-width: 100%;
                    height: 100%;
                    padding: 0;
                }
            }
        }
        .create-dataset-step-main {
            width: 47.83%;
            max-width: 750px;
            min-width: 542px;
            margin: 0 auto;
            padding: 20px 0;
            min-height: calc(100% - 95px);
            overflow: hidden;
            position: relative;
            .comp-item {
                width: 100%;
                padding: 0 30px;
            }
            .slide-left-enter-active, .slide-right-enter-active {
                transition: all .3s ease;
                position: absolute;
                left: 0;
                top: 20px;
            }
            .slide-left-leave-active, .slide-right-leave-active {
                transition: all .3s ease;
            }
            .slide-right-enter, .slide-left-leave-to
                /* .slide-fade-leave-active for below version 2.1.8 */ {
                transform: translateX(100%);
                opacity: 0;
            }
            .slide-left-enter, .slide-right-leave-to{
                transform: translateX(-100%);
                opacity: 0;
            }
        }
    }
</style>
