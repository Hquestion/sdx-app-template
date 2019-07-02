<template>
    <div class="data-image">
        <img
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
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.data-image {
    text-align: center;
    padding-top: 20px;
    img {
        width: 260px;
    }
}

</style>
