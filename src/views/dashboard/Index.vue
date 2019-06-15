<template>
    <div class="sdx-dashboard">
        <div class="left">
            <div class="left-top">
                <div class="resource">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <sdxu-content-panel
                                title="资源使用情况"
                                size="small"
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
                                                {{ (resource.memory / (1024*1024*1024)).toFixed(0) }}
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
                                                {{ diskCount }}
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
                                size="small"
                            >
                                <CircleProgress
                                    :percentage="20"
                                    :strokeWidth="12"
                                    :totalSteps="this.taskTotal"
                                    :completedSteps="this.taskCompleted"
                                />
                            </sdxu-content-panel>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="left-center">
                <sdxu-content-panel
                    title="行业模版"
                    size="small"
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
                            size="small"
                        >
                            <div v-if="taskNameList && taskNameList.length">
                                <el-select
                                    size="small"
                                    v-model="orderBy"
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="item in resourceType"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.value"
                                    />
                                </el-select>
                                <MoreBtn
                                    class="morebtn"
                                    @getMore="getTaskMore"
                                />
                                <bar-echarts
                                    height="354px"
                                    :barData="taskData"
                                    :barNameList="taskNameList"
                                    tipTitle="任务资源使用"
                                    :colorList="taskColorList"
                                />
                                <span class="xname">单位（{{ taskXname }}）</span>
                            </div>
                            <SdxuEmpty
                                v-else
                                height="354px"
                            />
                        </sdxu-content-panel>
                    </el-col>
                    <el-col :span="12">
                        <sdxu-content-panel
                            title="模型版本调用次数Top 10"
                            size="small"
                        >
                            <MoreBtn
                                class="morebtn"
                                @getMore="getTaskMore"
                            />
                            <bar-echarts
                                height="354px"
                                :barData="modelData"
                                :barNameList="modelNameList"
                                tipTitle="模型版本调用次数"
                                :colorList="modelColorList"
                            />
                            <span class="xname">单位（次）</span>
                        </sdxu-content-panel>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="right">
            <recent-updates
                title="最近更新的项目"
                :nameTimes="projectInfo"
            />
            <recent-updates
                title="最近更新的SkyFlow"
                :nameTimes="skyflowInfo"
            />
            <recent-updates
                title="最近更新的模型"
                :nameTimes="modelInfo"
            />
            <recent-updates
                title="最近更新的数据集"
                :nameTimes="datasetInfo"
            />
        </div>
    </div>
</template>
<script>

import CircleProgress from './SvgCircle';
import RainTransit from './RainTransit';
import WindIndustry from './WindIndustry';
import BarEcharts from './BarEcharts';
import { getUserResource, getTaskList, getDisk, getProjects, getModels, getDatasets, getSkyflows } from 'api/dashboard';
import MoreBtn from './MoreBtn';
import RecentUpdates from './RecentUpdates';
import { getVersionList } from '@sdx/utils/lib/api/model';

export default {
    name: 'Dashboard',
    data() {
        return {
            resource: {},
            options: [],
            gpuValue: '',
            taskCompleted: 0,
            taskTotal: 9,
            diskCount: 0,
            orderBy: 'CPU',
            resourceType: [
                {
                    label: '按CPU降序',
                    value: 'CPU'
                },
                {
                    label: '按内存降序',
                    value: 'MEMORY'
                }, {
                    label: '按GPU降序',
                    value: 'GPU'
                }
            ],
            taskData: [],
            taskNameList: [],
            taskXname: '核',
            taskColorList: ['#5C89FF', 'rgba(92,137,255,0.9)', 'rgba(92,137,255,0.8)',
                'rgba(92,137,255,0.7)', 'rgba(92,137,255,0.6)', 'rgba(92,137,255,0.5)',
                'rgba(92,137,255,0.4)', 'rgba(92,137,255,0.3)', 'rgba(92,137,255,0.2)', 'rgba(92,137,255,0.1)'],
            modelColorList: [
                'rgba(70,192,255,1)', 'rgba(70,192,255,0.9)', 'rgba(70,192,255,0.8)', 'rgba(70,192,255,0.7)',
                'rgba(70,192,255,0.6)', 'rgba(70,192,255,0.5)', 'rgba(70,192,255,0.4)',
                'rgba(70,192,255,0.3)', 'rgba(70,192,255,0.2)', 'rgba(70,192,255,0.1)'
            ],
            projectInfo: [],
            modelInfo: [],
            datasetInfo: [],
            skyflowInfo: [],
            modelNameList: [],
            modelData: []
        };
    },
    components: {
        CircleProgress,
        RainTransit,
        WindIndustry,
        BarEcharts,
        MoreBtn,
        RecentUpdates
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
        this.getTask().then(res => {
            this.taskTotal = res.data.total;
            this.taskCompleted = res.data && res.data.items.length;
        });
        this.getDiskCount();
        this.getProjectList();
        this.getModelList();
        this.getDatasetList();
        this.getSkyflowList();
        this.getVersionS();
    },
    methods: {
        // 资源
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
                });
        },
        // 任务列表
        getTask(purpose, resourcetype) {
            let params = {};
            if (purpose === 'top') {
                params = {
                    ownerId: this.$store.state.user.token.userId,
                    start: 1,
                    count: 10,
                    order: 'desc',
                    orderBy: resourcetype
                };
            } else {
                params = {
                    ownerId: this.$store.state.user.token.userId,
                    start: 1,
                    count: -1,
                    states: 'RUNNING'
                };
            }
            return new Promise((resolve, reject) => {
                getTaskList(params)
                    .then(res =>
                        resolve(res)
                    ).catch(error => {
                        reject(error);
                    });
            });
        },
        // disk 信息
        getDiskCount() {
            let params = {
                ownerId: this.$store.state.user.token.userId
            };
            getDisk(params)
                .then(res => {
                    this.diskCount = (res.usedBytes / (1024 * 1024 * 1024)).toFixed(0);
                });
        },
        // 获取更多任务
        getTaskMore() {
            console.log('任务更多');
        },
        // 项目列表
        getProjectList() {
            let params = {
                start: 1,
                count: 5,
                order: 'desc',
                orderBy: 'updatedAt'
            };
            getProjects(params)
                .then(res => {
                    for (let i = 0; i < res.data.items.length; i++) {
                        this.projectInfo.push(
                            {
                                name: res.data.items[i].name,
                                time: res.data.items[i].updatedAt
                            }
                        );
                    }
                });
        },
        // 模型列表
        getModelList() {
            let params = {
                order: 'desc',
                start: 1,
                count: 5,
                orderBy: 'updatedAt'
            };
            getModels(params)
                .then(res => {
                    for (let i = 0; i < res.items.length; i++) {
                        this.modelInfo.push(
                            {
                                name: res.items[i].name,
                                time: res.items[i].updatedAt
                            }
                        );
                    }
                });
        },
        // 数据集列表
        getDatasetList() {
            let params = {
                name: '',
                page: 1,
                page_size: 5,
                share_kind: -1,
                data_size: -1,
                order: 'desc',
                order_by: 'updated_at',
                data_format: -1,
                tag: -1
            };
            getDatasets(params)
                .then(res => {
                    for (let i = 0; i < res.data.items.length; i++) {
                        this.datasetInfo.push(
                            {
                                name: res.data.items[i].name,
                                time: res.data.items[i].updated_at
                            }
                        );
                    }
                });
        },
        // skyflow 列表
        getSkyflowList() {
            let params = {
                name: '',
                order: 'desc',
                order_by: 'updated_at',
                page: 1,
                page_size: 5
            };
            getSkyflows(params)
                .then(res => {
                    for (let i = 0; i < res.data.items.length; i++) {
                        this.skyflowInfo.push(
                            {
                                name: res.data.items[i].name,
                                time: res.data.items[i].updated_at
                            }
                        );
                    }
                });
        },
        // 获取模型版本列表
        getVersionS() {
            let params = {
                order: 'desc',
                order_by: 'updatedAt',
                start: 1,
                count: 10
            };
            getVersionList('ALL', params)
                .then(res => {
                    let [name, data, items] = [[], [], []];
                    if (res.items.length > 10) {
                        items = res.items.slice(0, 10);
                    } else {
                        items = res.items;
                    }
                    for (let i = 0; i < items.length; i++) {
                        name.push(items[i].name);
                        data.push(items[i].apiCallNum);
                    }
                    this.modelData = data.reverse(),
                    this.modelNameList = name.reverse();
                });
        }
    },
    watch: {
        orderBy: {
            immediate: true,
            handler(nval) {
                let [name, data, items] = [[], [], []];
                this.getTask('top', nval).then(res => {
                    if (res.data.items.length > 10) {
                        items = res.data.items.slice(0, 10);
                    } else {
                        items = res.data.items;
                    }
                    for (let i = 0; i < items.length; i++) {
                        name.push(items[i].name);
                        if (nval === 'CPU') {
                            this.taskXname = '核';
                            data.push(items[i].quota.cpu / 1000);
                        } else if (nval === 'GPU') {
                            this.taskXname = '块';
                            data.push(items[i].quota.gpu);
                        } else if (nval === 'MEMORY') {
                            this.taskXname = 'GB';
                            data.push(items[i].quota.memory / (1024 * 1024 * 1024));
                        }
                    }
                    this.taskData = data.reverse(),
                    this.taskNameList = name.reverse();
                });
            }
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
        flex:3;
        margin-right: 20px;
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
                            font-family:Roboto-Black;
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
                            font-weight: 900;
                            font-family:Roboto-Black;
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
            .el-input__inner {
                padding: 0 10px 0 0;
                border: none;
                color: #606266;
            }
            .el-select {
                position: absolute;
                top: 15px;
                right: 90px;
                width: 102px;
            }
            .sdxu-content-panel {
                position: relative;
            }
            .xname {
                position: absolute;
                bottom: 54px;
                right: 20px;
                color: rgba(96,98,102,1);
                font-size: 12px;
            }
            .morebtn {
                position: absolute;
                top: 10px;
                right: 6px;
            }
        }
    }
    .right {
        min-width: 282px;
        flex:1;
    }
}
</style>

