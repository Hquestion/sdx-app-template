<template>
    <div class="sky-ide-wrapper">
        <!--        <SkyNotebook :file="file"/>-->
        <SkyIDE />
    </div>
</template>

<script>
import SkyNotebook from '@sdx/view/components/sky-ide/src/widgets/notebook/SkyNotebook';
import SkyIDE from '@sdx/view/components/sky-ide/src/Main';
export default {
    name: 'Index',
    components: {
        SkyNotebook,
        SkyIDE
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

<style lang="scss" scoped>
.sky-ide-wrapper {
    position: relative;
    width: 100vw;
    height: 100vh;
}
</style>
