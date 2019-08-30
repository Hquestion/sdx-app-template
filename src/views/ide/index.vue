<template>
    <div class="sky-ide-wrapper">
        <SkyNotebook :file="file"/>
    </div>
</template>

<script>
import SkyNotebook from '@sdx/view/components/sky-ide/src/widgets/notebook/SkyNotebook';
export default {
    name: 'Index',
    components: {
        SkyNotebook
    },
    data() {
        return {
            file: {
                path: '/test.ipynb',
                // path: '/first.py',
                ownerId: '292a2b73-3093-4782-8719-a11e01e08398'
            }
        };
    }
};
</script>

<style scoped>

</style>
