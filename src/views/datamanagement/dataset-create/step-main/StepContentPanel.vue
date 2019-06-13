<template>
    <div class="step-content-panel">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'StepContentPanel'
};
</script>

<style scoped>
    .step-content-panel {
        width: 100%;
        margin: 0 auto;
        padding: 20px 30px 0;
    }
</style>
