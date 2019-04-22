<template>
    <div
        class="app-wrapper"
        :class="{hideSidebar:!sidebar.opened}"
    >
        <div class="sidebar-wrapper">
            <Sidebar class="sidebar-container" />
        </div>
        <div class="main-container">
            <Navbar />
            <AppMain />
        </div>
    </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from 'views/layout';

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },
    computed: {
        sidebar() {
            return this.$store.state.app.sidebar;
        }
    }
};
</script>
<style lang="scss" scoped>
.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    &.hideSidebar {
        .sidebar-wrapper {
            transform: translate(-180px, 0);
            .sidebar-container {
                transform: translate(165px, 0);
                & /deep/ .el-menu .el-menu {
                    height: 0;
                    overflow: hidden;
                }
                & /deep/ .logo {
                    transform: translate(-$ls-siderbar, 0);
                }
            }
            &:hover {
                 transform: translate(0, 0);
                 .sidebar-container {
                     transform: translate(0, 0);
                     & /deep/ .el-menu .el-menu {
                         height: auto;
                     }
                     & /deep/ .logo {
                         transform: translate(0, 0);
                     }
                 }
            }
        }
        .main-container {
            margin-left: 50px;
        }
    }
    .sidebar-wrapper {
        width: $ls-siderbar;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 5;
        overflow-x: hidden;
        transition: all 0.1s ease-out;
        box-shadow: 5px 0 8px 0 rgba(81,104,138,0.25);
    }
    .sidebar-container {
        transition: all 0.1s ease-out;
        background: $menu-bg-dark;
    }
    .main-container {
        height: 100%;
        background: $body-bg;
        transition: all 0.1s ease-out;
        margin-left: $ls-siderbar;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-wrap: wrap;
        flex-direction: column;
    }
}
</style>
