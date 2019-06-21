<template>
    <div class="workflow-log">
        <div
            class="log-container"
            :style="{'min-height': `${consoleMainHeight - 40}px`}"
        >
            <div class="comp-name">
                <span>当前画布</span>工作流日志：
            </div>
            <div class="item">
                <pre>
                    <div
                        v-for="(item, index) in workFlowLog"
                        :key="index"
                    >
                        {{ item }}
                    </div>
                </pre>
            </div>
        </div>
    </div>
</template>

<script>
import { getWorkFlowLog } from '@sdx/utils/lib/api/skyflow';
import { nodeState as nodeStateConf } from '../../js/skyflowConfig';
export default {
    name: 'WorkFlowLog',
    componentName: 'WorkFlowLog',
    data() {
        return {
            offset: 0,
            workFlowLog: [],
            getWorkFlowLogInterval: null
        };
    },
    props: {
        executeId: {
            type: String,
            default: ''
        },
        flowState: {
            type: Number,
            default: 0
        },
        consoleMainHeight: {
            type: Number
        },
        isReachBottom: {
            type: Boolean,
            default: true
        }
    },
    activated() {
        this.workFlowLog = [];
        this.offset = 0;
        this.stopPull();
        // console.log(11111111, this.executeId, this.flowState)
        // 首次获取
        this.getWorkFlowState();
        this.$emit('update:isReachBottom', true);
        this.startPull();
        this.unWatch = this.$watch('flowState', flowState => {
            if (flowState === nodeStateConf.RUNNING) {
                // 启定时器
                this.workFlowLog = [];
                this.$emit('update:isReachBottom', true);
                this.startPull();
            } else {
                this.stopPull();
            }
        });
    },
    methods: {
        // 获取执行流状态
        getWorkFlowState() {
            if (!this.executeId) {
                return;
            }
            getWorkFlowLog({
                execute_id: this.executeId,
                // execute_id: 'ac0e3a04b0c7a500092de64a',
                offset: this.offset
            })
                .then(data => {
                    this.offset = data.offset;
                    if (data.content) this.workFlowLog.push(data.content);
                    this.$emit('scrollToBottom');
                    this.stopPull();
                    this.startPull();
                });
        },
        startPull() {
            if (this.flowState === nodeStateConf.RUNNING) {
                if (!this.getWorkFlowLogInterval) {
                    this.getWorkFlowLogInterval = setTimeout(this.getWorkFlowState.bind(this), 1000);
                }
            } else {
                this.stopPull();
            }
        },
        stopPull() {
            clearTimeout(this.getWorkFlowLogInterval);
            this.getWorkFlowLogInterval = null;
        },
        clearLog() {
            this.workFlowLog = [];
        }
    },
    beforeDestroy() {
        this.stopPull();
    },
    deactivated() {
        if (this.unWatch) {
            this.unWatch();
        }
        this.stopPull();
    }
};
</script>

<style lang="scss" scoped>
.workflow-log {
    font-size: 14px;
    color: #3f5973;
    min-height: 100%;
    padding: 20px;
    .log-container {
        background: #F8F9FA;
        height: 100%;
        .comp-name {
            padding: 0 20px;
            height: 47px;
            line-height: 47px;
            border-bottom: 1px solid #dedede;
            span {
                color: #459cdf;
                margin-right: 6px;
            }
        }
    }
    .item {
        color: #3F5973;
        padding: 0 20px;
        min-height: 100%;
        &>div{
            margin-bottom:5px;
        }
    }
    pre {
        font-size: 16px;
        white-space:pre-wrap;
        word-wrap:break-word;
        margin: 0;
    }
}
</style>
