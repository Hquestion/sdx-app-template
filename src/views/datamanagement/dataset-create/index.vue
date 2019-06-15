<template>
    <div class="dataset-create">
        <SkyTitleGoBack
            class="back-indicator"
            title="创建数据集"
        />
        <StepBar />
        <StepMain />
    </div>
</template>

<script>
/**
     * 用于组织页面的所有组件
     */
import StepBar from './StepBar';
import SkyTitleGoBack from '../../datas/rely/util/skyTitleGoBack';
import StepSwitchTool from './StepSwitchTool';
import StepMain from './step-main/Index';
import { mapActions } from 'vuex';
export default {
    name: 'CreateDataset',
    components: {
        StepSwitchTool,
        SkyTitleGoBack,
        StepBar,
        StepMain
    },
    data() {
        return {};
    },
    methods: {
        ...mapActions([
            'setDatasetCreatingType',
            'resetDatasetStore'
        ])
    },
    mounted() {
        let type = this.$route.params.type;
        this.setDatasetCreatingType(type);
        return type;
    },
    beforeRouteLeave(to, form, next) {
        if (this.$store.state.dataset.isCreating) {
            this.$confirm('当前正在创建数据集，退出将清空已填写的内容，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnHashChange: false,
                closeOnClickModal: false
            }).then(() => {
                this.resetDatasetStore();
                next();
            }).catch(() => {
                next(false);
            });
        } else {
            this.resetDatasetStore();
            next();
        }
    }
};
</script>

<style lang="scss" scoped>
    .dataset-create {
        /*height: 100%;*/
        .back-indicator {
            margin-left: 10px;
        }
    }
</style>
