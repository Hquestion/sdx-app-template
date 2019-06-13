<template>
    <div class="setting-group">
        <div class="setting-type">
            <hr class="setting-line">
            <span>资源配置</span>
        </div>
        <div class="setting-options">
            <el-form
                :model="resource"
                :gpuModel.sync="gpuModel"
            >
                <number-pick
                    v-for="(item, key) in resource"
                    :key="key"
                    v-model="resource[key]"
                    :resource="resource"
                    :quota="quota"
                    :total="total"
                    :is-editable="isEditable"
                    :resource-item="key"
                    :gpuModel.sync="_gpuModel"
                />
            </el-form>
        </div>
    </div>
</template>

<script>
import numberPick from './numberPick';
import ResourceConfig from '@sdx/widget/lib/resource-config';

export default {
    name: 'ResourceSetting',
    props: {
        resource: {
            type: Object,
            default: null
        },
        quota: {
            type: Object,
            default: null
        },
        total: {
            type: Object,
            default: null
        },
        isEditable: {
            type: Boolean,
            default: true
        },
        dockerImage: {
            type: Object,
            default: null
        },
        gpuModel: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            resourceHint: false,
            hintContent: '',
            resourceDesc: false,
            resourceGroups: []
        };
    },
    components: {
        numberPick,
        ResourceConfig
    },
    computed: {
        _gpuModel: {
            get() {
                return this.gpuModel;
            },
            set(nval) {
                this.$emit('update:gpuModel', nval);
            }
        },
        // 是否为spark
        isSpark() {
            return !!this.dockerImage.name.includes('spark');
        }
    },
    methods: {
        resourceToGroups() {
            // todo:
        },
        groupsToResource() {
            // todo:
        }
    },
    watch: {
        resource: {
            deep: true,
            handler() {
                let [cpu, gpu, mem] = [0, 0, 0];
                // 剩余资源校验
                for (let key in this.resource) {
                    if (key.includes('CORES')) {
                        cpu += this.resource[key];
                    } else if (key.includes('MEMORY')) {
                        mem += this.resource[key];
                    } else if (key.includes('GPUS')) {
                        gpu += this.resource[key];
                    }
                }
                if (cpu > this.quota.cpu || gpu > this.quota.gpu || mem > this.quota.mem) {
                    this.resourceDesc = true;
                } else {
                    this.resourceDesc = false;
                }


                // 资源配置校验
                for (let key in this.resource) {
                    if (key.includes('CORES')) {
                        if (this.resource[key] === 0) {
                            this.hintContent = 'cpu';
                            this.resourceHint = true;
                            break;
                        } else {
                            this.resourceHint = false;
                        }
                    } else if (key.includes('MEMORY')) {
                        if (this.resource[key] === 0) {
                            this.resourceHint = true;
                            this.hintContent = '内存';
                            break;
                        } else {
                            this.resourceHint = false;
                        }
                    }
                }

                this.$emit('updateResource', this.resource);
            }
        }
    }
};
</script>

<style scoped>
.resource-info {
    font-size: 12px;
    font-family: siyuan-rg;
    color: #3f5973;
    /* margin: 20px; */
}

.resource-info span:first-child {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 14px;
}

.resource-info table {
    border-collapse: collapse;
    width: 210px;
    height: 55px;
    border: 1px solid rgba(206, 214, 222, 1);
    text-align: center;
    vertical-align: top;
}

.resource-info td {
    border: solid rgba(206, 214, 222, 1);
    border-width: 0 1px;
}

.current-user {
    float: right;
}

.resource-option-button {
    margin: 20px 0 16px 0;
    width: 186px;
}

.resource-button {
    display: block;
    width: 52px;
    height: 32px;
    line-height: 32px;
    border: 1px solid rgba(206, 214, 222, 1);
    margin-right: 12px;
    text-align: center;
    font-size: 12px;
    color: rgba(134, 151, 167, 1);
    cursor: pointer;
    float: left;
}
.resource-button:last-child {
    margin-right: 0;
}

.resource-button:hover {
    color: white;
    background-color: rgba(134, 151, 167, 1);
}

.resource-button.active {
    color: white;
    background-color: rgba(134, 151, 167, 1);
}

.resource-value {
    font-size: 12px;
    color: #f56c6c;
    position: relative;
    bottom: 10px;
}

.resource-desc {
    font-size: 12px;
    color: #576a7d;
    line-height: 18px;
}
</style>
