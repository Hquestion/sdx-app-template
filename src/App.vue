<template>
    <div id="app">
        <feb-alive>
            <router-view />
        </feb-alive>
    </div>
</template>

<script>
export default {
    name: 'APP'
};
</script>
<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>

