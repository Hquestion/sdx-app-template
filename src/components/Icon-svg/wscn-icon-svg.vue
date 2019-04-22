<template>
    <svg
        class="wscn-icon"
        aria-hidden="true"
    >
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'WscnIconSvg',
    props: {
        iconClass: {
            type: String,
            required: true
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
