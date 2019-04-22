<template>
    <section class="app-main">
        <router-view />
    </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'AppMain',
    computed: {
        ...mapState({
            guideVisible: state => state.app.guide.visible,
            guideShown: state => state.app.guide.neverShow
        }),
        key() {
            return this.$route.name !== undefined
                ? this.$route.name + +new Date()
                : this.$route + +new Date();
        }
    },
    mounted() {
        // 判断显示guide
        this.toggleGuide();
    },
    methods: {
        ...mapActions(['toggleGuide'])
    }
};
</script>
<style lang="scss" scoped>
	.app-main {
		height: 100%;
        overflow: auto;
        flex: 1;
	}
</style>
