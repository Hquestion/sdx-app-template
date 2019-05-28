<template>
    <div class="sdx-dashboard">
        <div class="left">
            <div class="left-top">
                <div class="resource">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <sdxu-content-panel
                                title="资源使用情况"
                            >
                                <el-row
                                    :gutter="20"
                                    class="resource-items"
                                >
                                    <el-col :span="12">
                                        <div>
                                            <i class="iconfont iconicon-cpu-dashboard" />
                                        </div>
                                        <div class="resource-items-content">
                                            <div>
                                                {{ resource.cpu / 1000 }}
                                            </div>
                                            <div>
                                                <span>CPU</span>（核）
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div>
                                            <i class="iconfont iconicon-GPU-dashboard" />
                                        </div>
                                        <div class="resource-items-content">
                                            <div>
                                                {{ gpuCount }}
                                            </div>
                                            <div class="gpu-resource">
                                                <el-select
                                                    size="small"
                                                    v-model="gpuValue"
                                                    placeholder="请选择"
                                                >
                                                    <el-option
                                                        v-for="item in options"
                                                        :key="item.label"
                                                        :label="item.label"
                                                        :value="item.value"
                                                    />
                                                </el-select>（块）
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row
                                    :gutter="20"
                                    class="resource-items marginTop20"
                                >
                                    <el-col :span="12">
                                        <div>
                                            <i class="iconfont iconicon-neicun" />
                                        </div>
                                        <div class="resource-items-content">
                                            <div>
                                                {{ resource.memory / (1024*1024*1024) }}
                                            </div>
                                            <div>
                                                <span>内存</span>（GB）
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="12">
                                        <div>
                                            <i class="iconfont iconicon-disk" />
                                        </div>
                                        <div class="resource-items-content">
                                            <div>
                                                20
                                            </div>
                                            <div>
                                                <span>DISK</span>（GB）
                                            </div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </sdxu-content-panel>
                        </el-col>
                        <el-col
                            :span="8"
                            class="task"
                        >
                            <sdxu-content-panel
                                title="运行任务总数"
                            >
                                <CircleProgress
                                    :percentage="20"
                                    :strokeWidth="12"
                                />
                            </sdxu-content-panel>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="left-center">
                <sdxu-content-panel
                    title="行业模版"
                >
                    <el-row
                        class=""
                        :gutter="20"
                    >
                        <el-col :span="12">
                            <rain-transit />
                        </el-col>
                        <el-col :span="12">
                            <wind-industry />
                        </el-col>
                    </el-row>
                </sdxu-content-panel>
            </div>
            <div class="left-bottom">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <sdxu-content-panel
                            title="任务资源使用Top 10"
                        >
                            <bar-echarts height="354px" />
                        </sdxu-content-panel>
                    </el-col>
                    <el-col :span="12">
                        <sdxu-content-panel
                            title="模型版本调用次数Top 10"
                        >
                            <bar-echarts height="354px" />
                        </sdxu-content-panel>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="right">
            right
        </div>
    </div>
</template>
<script>

import CircleProgress from './SvgCircle';
import RainTransit from './RainTransit';
import WindIndustry from './WindIndustry';
import BarEcharts from './BarEcharts';
import { getUserResource } from 'api/dashboard';

export default {
    name: 'Dashboard',
    data() {
        return {
            resource: {},
            options: [],
            gpuValue: ''
            // gpuCount: 0
        };
    },
    components: {
        CircleProgress,
        RainTransit,
        WindIndustry,
        BarEcharts
    },
    computed: {
        gpuCount() {
            let count = 0;
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value === this.gpuValue) {
                    count = this.options[i].count;
                }
            }
            return count;
        }
    },
    created() {
        this.getResource();
    },
    methods: {
        getResource() {
            let userId = this.$store.state.user.token.userId;
            getUserResource(userId)
                .then(data => {
                    this.resource = data;
                    this.options = data.gpus.map(item => {
                        item.value = item.label;
                        return item;
                    });
                    this.gpuValue = data.gpus[0].label;

                    console.log(data, this.options, 88);
                });
        }
    }
};
</script>
<style lang="scss">
.sdx-dashboard {
    display:flex;/*设为伸缩容器*/
    flex-flow:row;/*伸缩项目单行排列*/
    & /deep/ {
        .sdxu-content-panel__main {
            margin-top: 0 ;
        }
        .sdxu-content-panel {
            padding: 20px;
        }
    }
    .marginTop20 {
        margin-top: 20px;
    }
    .left {
        flex:3;/*这里设置为占比1，填充满剩余空间*/
        .left-top {
            height: 304px;
            .resource {
                .resource-items {
                    .el-col > div {
                        height:104px;
                        background:rgba(247,247,247,1);
                        border-radius:2px;
                    }
                    .el-col {
                        display: flex;
                        & > div:first-child {
                            flex: 4;
                            text-align: center;
                            & /deep/ .iconfont {
                                width: 64px;
                                height: 64px;
                                display: inline-block;
                                border-radius: 100%;
                                line-height: 64px;
                                margin-top: 20px;
                                font-size: 34px;
                                color: #fff;
                            }
                            .iconicon-cpu-dashboard {
                                background: #5C89FF;
                            }
                            .iconicon-GPU-dashboard {
                                background: #4EDBDD;
                            }
                            .iconicon-neicun {
                                background: #F68573;
                            }
                            .iconicon-disk {
                                background: #9791FF;
                            }
                        }
                        & div:last-child {
                            flex: 5;
                        }
                    }
                    .resource-items-content {
                        padding: 24px 0;
                        & > div:first-child {
                            font-size: 24px;
                            font-family: Impact;
                            color: rgba(48,49,51,1);
                            line-height: 34px;
                        }
                        & > div:last-child {
                            font-size: 14px;
                            color: rgba(96,98,102,1);
                            line-height: 26px;
                            height: 16px;
                            span {
                                font-weight: 900;
                            }
                        }
                        .gpu-resource {
                            line-height: 26px !important;
                            height: 30px !important;
                        }
                        .el-select {
                            width: 98px;
                        }
                        .el-input__inner {
                            padding: 0 10px 0 0;
                            border: none;
                            background: #F7F7F7;
                            font-size: 14px;
                            color: #606266;
                        }
                    }
                }
                .task {
                    .sdxu-content-panel {
                        height: 304px;
                        & /deep/.sdxu-content-panel__main  {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 236px;
                        }

                    }
                }
            }
        }
        .left-center {
            height: 230px;
            @extend .marginTop20;
        }
        .left-bottom {
            @extend .marginTop20;
            height: 430px;
        }
    }
    .right {
        min-width: 282px;
        flex:1;
    }
}
</style>

