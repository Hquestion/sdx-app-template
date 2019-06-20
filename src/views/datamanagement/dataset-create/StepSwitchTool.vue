<template>
    <div class="step-switch-tool">
        <div class="step-switch-tool-box">
            <el-button
                v-show="revokable"
                icon="el-icon- iconfont icon-ico_back"
                @click="revoke"
            >
                撤销
            </el-button>
            <div style="flex: 1" />
            <el-button
                class="step-prev-btn"
                v-show="isStart"
                @click="cancel"
            >
                取消
            </el-button>
            <el-button
                class="step-prev-btn"
                v-show="!isStart"
                @click="prevStep"
            >
                上一步
            </el-button>
            <el-button
                type="primary"
                class="step-pre-btn"
                v-show="!isEnd"
                @click="nextStep"
            >
                下一步
            </el-button>
            <el-button
                type="primary"
                v-show="isEnd"
                @click="save"
                :loading="saving"
            >
                保&nbsp;存
            </el-button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
export default {
    name: 'StepSwitchTool',
    data() {
        return {};
    },
    props: {
        revokable: {
            type: Boolean,
            default: false
        },
        saving: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            currentStep: state => state.dataset.currentStep,
            creatingType: state => state.dataset.creatingType
        }),
        ...mapGetters([
            'stepLength'
        ]),
        isStart() {
            return this.currentStep === 0;
        },
        isEnd() {
            return this.currentStep === (this.stepLength - 1);
        }
    },
    methods: {
        prevStep() {
            this.$emit('prev');
        },
        nextStep() {
            this.$emit('next');
        },
        save() {
            this.$emit('save');
        },
        cancel() {
            this.$emit('cancel');
        },
        revoke() {
            this.$emit('revoke');
        }
    }
};
</script>

<style lang="scss" scoped>
    .step-switch-tool {
        width: 100%;
        height: 95px;
        border-top: 1px solid #C9D2E1;
        background: #fff;
        display: flex;
        align-items: center;
        .step-switch-tool-box {
            width: 47.83%;
            max-width: 750px;
            min-width: 542px;
            display: flex;
            padding: 0 30px;
            justify-content: flex-end;
            align-items: center;
            margin: 0 auto;
        }
    }
</style>
