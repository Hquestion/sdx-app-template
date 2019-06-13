<template>
    <div class="step-data-preprocessing">
        <DataSetPreview
            :data="showData"
            :columns="schemas"
            :height="containerHeight"
            v-model="schemaActions"
            v-loading="isLoadingTableData"
            ref="datasetPreview"
            @reach-bottom="loadMore"
        />
    </div>
</template>

<script>
import DataSetPreview from './DataSetPreview';
import { createDatasetPreProcess } from '../../../datas/rely/dataSourceApi';
import CreateRequestParamMixin from './mixins/CreateRequestParamMixin';
import { mapActions } from 'vuex';
import StepChangeHooks from './mixins/StepChangeHooks';

export default {
    name: 'StepDataPreprocessing',
    components: {
        DataSetPreview
    },
    mixins: [CreateRequestParamMixin, StepChangeHooks],
    data() {
        return {
            compWidth: 'full',
            schemas: Object.freeze(this.$store.state.dataset.form.structDataPreProcessing.destSchema || []),
            // data: this.$store.state.dataset.form.structDataPreProcessing.data || [],
            pageIndex: 0,
            pageSize: 50,
            containerHeight: '100%',
            schemaActions: this.$store.state.dataset.form.structDataPreProcessing.schemaActions || [],
            totalPage: 1,
            poppedStack: [],
            isLoadingTableData: false,
            showData: []
        };
    },
    computed: {
        revokable() {
            return this.schemaActions.length > 0;
        }
    },
    methods: {
        ...mapActions([
            'setStructDataPreProcess'
        ]),
        init() {
            this.fetchCurrentSchemaMetadata();
        },
        fetchCurrentSchemaMetadata() {
            let params = this.createPreProcessReqParam();
            this.isLoadingTableData = true;
            createDatasetPreProcess(params).then(res => {
                this.data = res.data_rows.map(item => JSON.parse(item));
                setTimeout(() => {
                    this.isLoadingTableData = false;
                }, 200);
                let isEmpty = true;
                if (this.data.slice(0, 10).some(item => !_.isEmpty(item))) {
                    isEmpty = false;
                }
                // 判断一下data_rows 是否为空数组
                if (res.data_rows && res.data_rows.length === 0) {
                    isEmpty = false;
                    this.data = [];
                }
                if (isEmpty) {
                    this.data = [];
                    this.schemas = Object.freeze([]);
                    this.totalPage = 0;
                    this.$notify.error({
                        title: '数据预处理失败！',
                        message: '非法的schema,请返回上一步调整后重试。',
                        duration: 3000
                    });
                    return;
                }
                // 重置当前页码，重新获取分页数据
                this.pageIndex = 0;
                this.showData = Object.freeze(this.data.slice(this.pageIndex, this.pageSize));
                this.schemas = Object.freeze(res.sky_schema);
                this.totalPage = Math.ceil(this.data.length / this.pageSize);
                this.$nextTick(() => {
                    this.$refs.datasetPreview.scrollToTop();
                });
            }).catch(err => {
                this.data = Object.freeze([]);
                this.schemas = Object.freeze([]);
                this.showData = Object.freeze([]);
                this.totalPage = 0;
                setTimeout(() => {
                    this.isLoadingTableData = false;
                }, 200);
            });
        },
        loadMore() {
            if (this.pageIndex < this.totalPage - 1) {
                this.pageIndex += 1;
                setTimeout(() => {
                    this.showData = Object.freeze([...this.showData, ...this.data.slice(this.pageIndex * this.pageSize, (this.pageIndex + 1) * this.pageSize)]);
                }, 10);
            }
        },
        beforeNextStep() {
            return new Promise((resolve, reject) => {
                if (this.data.length > 0 && this.schemas.length > 0) {
                    this.syncStore();
                    resolve();
                } else {
                    this.$message.error('数据预处理失败!');
                    reject();
                }
            });
        },
        syncStore() {
            this.setStructDataPreProcess({
                schemaActions: this.schemaActions,
                // data: this.data,
                destSchema: Object.freeze(this.schemas)
            });
        },
        onRevoke() {
            let action = this.schemaActions.length > 0 && this.schemaActions.pop();
            this.poppedStack.push(action);
        }
    },
    watch: {
        schemaActions: {
            deep: true,
            handler() {
                this.fetchCurrentSchemaMetadata();
            }
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="scss" scoped>
    .step-data-preprocessing {
        height: 100%;
        padding: 0 !important;
    }
</style>
