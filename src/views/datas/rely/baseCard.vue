<template>
    <div class="task-card">
        <span class="color-bar" />
        <div class="task-card-header">
            <span class="title-icon" />
            <p
                class="task-name"
                :title="task.name||'没有标题'"
            >
                {{ task.name || '没有标题' }}
            </p>
            <p class="creater">
                创建人: {{ task.user.fullname }}
            </p>
            <p class="task-state">
                <state-label
                    :label="task.state.label"
                    :show-loading="task.state.need_pull"
                    :type="task.state.name"
                    :show-error="task.err_code && task.err_code !== 1000"
                    :show-bg="true"
                    :error-msg="task.err_msg"
                />
            </p>
        </div>
        <div class="task-card-info">
            <!-- <el-tooltip class="item" effect="light" :content="task.description || '无'" placement="top" popper-class="base-card-tip">
                <p class="desc">
                    描述 :{{task.description || '无'}}
                </p>
            </el-tooltip> -->
            <p class="time">
                <span class="iconfont icon-clock" />
                <span>{{ task.created_at || '无' }}</span>
            </p>
            <slot name="option">
                <!-- 插入操作节点,入IDE中jupyter的Url等 -->
            </slot>
        </div>
        <div class="task-card-footer">
            <card-btn
                v-for="item in task.state.allow_operations"
                :style="{width:`${btnWidth}%`}"
                :key="item"
                :type="item"
                :loading="loadingAction === item"
                @click.native="handleBtnClick(item)"
            />
        </div>
    </div>
</template>

<script>
import cardBtn from './cardBtn';
import stateLabel from './stateLabel';
export default {
    name: 'BaseCard',
    components: { cardBtn, stateLabel },
    data() {
        return {
            loadingAction: ''
        };
    },
    props: {
        task: {
            type: Object,
            default: () => ({})
        },
        cooperate: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        btnWidth() {
            return (1 / this.task.state.allow_operations.length * 100).toFixed(
                2
            );
        }
    },
    methods: {
        handleBtnClick(type) {
            this.loadingAction = type;
            this.$emitAsync('btnClick', type).then(() => {
                this.loadingAction = '';
            }, () => {
                this.loadingAction = '';
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "../../../assets/styles/base/colors";
    @import "../../../assets/styles/base/constants";
    @import "../../../assets/styles/base/mixin";
.task-card {
    box-sizing: border-box;
    display: block;
    height: 187px;
    width: 342px;
    border: 1px solid $c-split;
    margin-top: 20px;
    padding-top: 6px;
    padding-bottom: 37px;
    position: relative;
    overflow: hidden;
    .color-bar {
        position: absolute;
        height: 6px;
        top: 0;
        right: 0;
        width: 100%;
    }
    .task-state {
        position: absolute;
        top: 17px;
        right: 10px;
    }
    .task-card-header {
        padding: 18px 20px 20px 74px;
        position: relative;
        line-height: 21px;
        height: 78px;
        color: #45474c;
        .title-icon {
            display: block;
            position: absolute;
            height: 44px;
            width: 44px;
            top: 20px;
            left: 20px;
            border: 1px solid $c-split;
        }
        p {
            margin: 0;
            &.task-name {
                color: #45474C;
                font-size: 16px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 180px;
            }
            &.creater {
                margin: 0;
                float: left;
                font-size: 14px;
                margin-top: 8px;
                color: #7A8599;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 200px;
            }
        }
    }
    .task-card-info {
        padding: 0 20px 0 74px;
        color: #7A8599;
        p {
            margin: 0;
            &.desc {
                line-height: 20px;
                margin-bottom: 8px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            &.time {
                font-size: 14px;
                // color: $c-description;
                line-height: 19px;
                .iconfont {
                    font-size: inherit;
                    margin-right: 10px;
                }
            }
        }
        .option {
            text-align: right;
            padding-top: 12px;
            .goto {
                color: $c-main;
                font-size: $fs-content;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
    .task-card-footer {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 37px;
        border: none;
        border-top: 1px dotted $c-split;
        white-space: normal;
    }
    &.ribbon:before {
        display: block;
        position: absolute;
        height: 20px;
        width: 60px;
        line-height: 20px;
        text-align: center;
        color: $white;
        font-size: $fs-sub;
        right: 10px;
        top: 51px;
        border-radius: 10px;
        z-index: 1;
    }
}
.base-card-tip {
    width: 200px;
}
</style>
