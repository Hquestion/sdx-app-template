<template>
    <div class="data-image">
        <img
            :style="{'width': imageWidth, 'height': isIcon ? imageWidth : '100%', 'padding-top': isIcon ? '0px' : '20px'}"
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
        imageWidth: {
            type: String,
            default: '22%'
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
