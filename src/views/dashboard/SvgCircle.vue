<template>
    <sdxu-radial-progress
        :diameter="200"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        stopColor="#4781F8"
        startColor="#8AEBFF"
        innerStrokeColor="#ECF3FD"
        :strokeWidth="16"
        :slideWidth="16"
    >
        <p class="completedNumber">
            {{ completedSteps }}
        </p>
        <p class="content">
            <span>运行中任务</span>（个）
        </p>
    </sdxu-radial-progress>
</template>

<script>

export default {
    data() {
        return {
        };
    },
    props: {
        completedSteps: {
            type: Number,
            default: 0
        },
        totalSteps: {
            type: Number,
            default: 0
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.completedNumber {
    color: #303133;
    color: #303133;
    font-size: 36px;
    font-family: Impact;
}
.content {
    font-size: 14px;
    color: rgba(96,98,102,1);
    line-height: 26px;
    height: 16px;
    font-family:Roboto-Black;
    span {
        font-weight: 900;
    }
}
</style>