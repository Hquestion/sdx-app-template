<template>
    <div class="content-cate-header">
        {{ title }}
        <slot />
    </div>
</template>

<script>
export default {
    name: 'ContentCateHeader',
    props: {
        title: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
    .content-cate-header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0 30px;
        text-align: left;
        font-size:16px;
        font-family:siyuan;font-weight:400;;
        color: #45474C;
        box-shadow:0px 2px 0px 0px rgba(201,210,225,0.3);
    }
</style>
