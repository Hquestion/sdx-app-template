<template>
    <div class="sdx-slidebar">
        <div class="logo">
            <div
                class="inner"
                :class="{hideLogo:!sidebar.opened}"
            />
        </div>
        <ElScrollbar
            class="sdx--slidebar--scrollbar"
            wrap-class="layout-aside-wrap"
        >
            <SdxMenu :menu-data="permissionRoutes" />
        </ElScrollbar>
    </div>
</template>

<script>
import leftmenu from '../../config/menuConfig';
import SdxMenu from '../../components/SdxMenu/index.vue';

export default {
    name: 'Sidebar',
    data() {
        return {
            // 不渲染当前用户没有权限访问的菜单
            permissionRoutes: leftmenu
        };
    },
    components: {
        SdxMenu
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sdx-slidebar {
    height: 100%;
    width: $ls-siderbar;
    overflow: hidden;
    .logo {
        background: $menu-bg-dark;
        position: relative;
        width: 100%;
        height: $ls-headerbar;
        text-align: center;
        transition: all 0.1s ease-out;
        .inner {
            background: url('../../assets/images/logonew.png') no-repeat;
            background-size:cover;
            width: 100%;
            height: 100%;
            position: relative;
        }
        /*.hideLogo {*/
        /*    !*background: none;*!*/
        /*    width: 100%;*/
        /*    !*height: 80%;*!*/
        /*    position: absolute;*/
        /*    top: 0;*/
        /*    left: 0;*/
        /*}*/
    }
    .sdx--slidebar--scrollbar {
        flex: 1;
        height: calc(100% - 60px);
        position: relative;
        & /deep/ .layout-aside-wrap {
            height: 100%;
            overflow-x: hidden;
        }
    }
}
</style>
