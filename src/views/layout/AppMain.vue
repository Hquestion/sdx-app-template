<template>
    <section class="app-main">
        <div class="app-main-view">
            <div class="app-main-breadcrumb">
                <SdxwBreadcrumb />
            </div>
            <div
                class="app-main-header"
                v-if="$route.meta.header"
            >
                {{ $route.meta.header }}
            </div>
            <!--            <feb-alive>-->
            <router-view class="app-main-body" />
            <!--            </feb-alive>-->
        </div>
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
<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../assets/styles/base/mixin.scss";
    @import "../../assets/styles/base/colors.scss";
    @import "../../assets/styles/base/constants.scss";

	.app-main {
        width: 100%;
		height: calc(100% - 60px);
        flex: 1;
        overflow: auto;
        .app-main-breadcrumb {
            margin-top: 24px;
            display: flex;
            align-items: center;
        }
        .app-main-view {
            overflow: auto;
            min-height: 100%;
            padding: 0 24px 24px;
            .app-main-header {
                margin-top: 24px;
                font-size: 24px;
                font-weight: 400;
            }
            .app-main-body {
                margin-top: 32px;
            }
        }
	}
</style>
