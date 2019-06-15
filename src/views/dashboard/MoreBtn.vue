<template>
    <div class="dashboard_morebtn">
        <SdxuButton
            type="primary"
            size="regular"
            :plain="true"
            @click="$emit('getMore')"
        >
            更多
            <i class="iconfont iconicon-arrow-right" />
        </SdxuButton>
    </div>
</template>

<script>

export default {

};
</script>
<style rel="stylesheet/scss" lang="scss" >
.dashboard_morebtn {
    .iconfont {
        font-size: 12px;
    }
    .sdxu-button__main {
        font-size: 12px;
        color: #5C89FF;
    }
}
</style>