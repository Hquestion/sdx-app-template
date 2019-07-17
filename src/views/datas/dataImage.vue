<template>
    <div class="data-image">
        <img
            :style="{ 'padding-top': isIcon ? '0px' : '20px'}"
            :src="imageUrl"
        >
    </div>
</template>
<script>

export default {
    name: 'DataImage',
    props: {
        imageUrl: {
            type: String,
            default: ''
        },
        isIcon: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.data-image {
    text-align: center;
}
</style>
