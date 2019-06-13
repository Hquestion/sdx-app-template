<template>
    <div class="sdx-slidebar">
        <div class="logo">
            <div
                class="inner"
                :class="{hideLogo:!sidebar.opened}"
            >
                <wscn-icon-svg
                    iconClass="iconicon-Logo"
                    class="logo-icon"
                />
                <i class="iconfont iconico_project logo-icon-mini" />
            </div>
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
import { leftmenu, manageMenus } from '../../config/menuConfig';
import SdxMenu from '../../components/SdxMenu/index.vue';
// todo 处理权限相关的菜单

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
    },
    mounted() {
        if (this.$route.meta.system === 'manage') {
            this.permissionRoutes = manageMenus;
        } else {
            this.permissionRoutes = leftmenu;
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
            /*background: url('../../assets/images/logonew.png') no-repeat;*/
            /*background-size:cover;*/
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
            line-height: $ls-headerbar;;
            .logo-icon {
                width: 100%;
                height: 100%;
                padding: 0 15px;
                position: absolute;
                left: 0;
                top: 0;
            }
            .logo-icon-mini {
                display: inline-block;
                font-size: 30px;
                position: absolute;
                left: 50%;
                top: 0;
                transform: translate(155px, 0);
                color: $sdx-success-color;
                transition: transform ease-in .1s;
            }
        }
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
