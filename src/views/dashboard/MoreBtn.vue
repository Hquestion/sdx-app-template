<template>
    <div>
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
<style rel="stylesheet/scss" lang="scss" scoped>

</style>