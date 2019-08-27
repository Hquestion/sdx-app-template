<template>
    <sdxu-dialog
        title="选择数据类型"
        :visible.sync="createDatasetVisible"
        width="400px"
    >
        <div class="create-dataset-options">
            <el-button
                class="option-btn"
                @click="create('STRUCT')"
            >
                结构化数据
            </el-button>
            <el-button
                class="option-btn"
                @click="create('NON_STRUCT')"
            >
                非结构化数据
            </el-button>
        </div>
    </sdxu-dialog>
</template>

<script>
export default {
    name: 'CreateDatasetOption',
    data() {
        return {
            createDatasetVisible: false
        };
    },
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'visible',
        event: 'change'
    },
    methods: {
        create(type) {
            this.$router.push(`/datasManage/create-dataset/${type}`);
        }
    },
    watch: {
        visible(val) {
            this.createDatasetVisible = val;
        },
        createDatasetVisible(val) {
            this.$emit('change', val);
        }
    }
};
</script>

<style lang="scss" scoped>
    .create-dataset-options {
        display: flex;
        justify-content: space-between;
        .option-btn {
            width: 46%;
        }
    }
</style>
