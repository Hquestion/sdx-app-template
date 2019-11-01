<template>
    <div class="sdx-slidebar">
        <div class="logo">
            <div
                class="inner"
                :class="{hideLogo:!sidebar.opened}"
            >
                <wscn-icon-svg
                    iconClass="iconSDXLogo"
                    class="logo-icon"
                />
                <wscn-icon-svg iconClass="iconlogoshouqi" class="logo-icon-mini"></wscn-icon-svg>
            </div>
        </div>
        <ElScrollbar
            class="sdx--slidebar--scrollbar"
            wrap-class="layout-aside-wrap"
        >
            <SdxMenu :menus="permissionRoutes" :collapse="!sidebar.opened" />
        </ElScrollbar>
        <div class="collapse-toggler" :class="{'is-collapse': !sidebar.opened}" @click="toggleCollapse">
            <i class="iconfont iconcebianlanzhankaiICON"></i>
        </div>
    </div>
</template>

<script>
import { leftmenu, manageMenus } from '../../config/menuConfig';
// import SdxMenu from '../../components/SdxMenu/index.vue';
import SdxMenu from '../../components/Menu/Main';

export default {
    name: 'Sidebar',
    data() {
        return {
            permissionRoutes: []
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
    methods: {
        toggleCollapse() {
            this.$store.dispatch('ToggleSideBar');
        }
    },
    mounted() {
        let manageMenusBak = JSON.parse(JSON.stringify(manageMenus));
        let leftmenuBak = JSON.parse(JSON.stringify(leftmenu));
        if (this.$route.meta.system === 'manage') {
            this.permissionRoutes = manageMenusBak.filter(item => {
                if (item.auth) {
                    return this.$auth(item.auth, 'MENU');
                } else {
                    if (item.children) {
                        item.children = item.children.filter(child => {
                            if (child.auth) {
                                return this.$auth(child.auth, 'MENU');
                            } else {
                                return true;
                            }
                        });
                        return item.children.length > 0;
                    }
                    return true;
                }
            });
        } else {
            this.permissionRoutes = leftmenuBak.filter(item => {
                if (item.auth) {
                    return this.$auth(item.auth, 'MENU');
                } else {
                    if (item.children) {
                        item.children = item.children.filter(child => {
                            if (child.auth) {
                                return this.$auth(child.auth, 'MENU');
                            } else {
                                return true;
                            }
                        });
                        return item.children.length > 0;
                    }
                    return true;
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../assets/styles/base/colors";
    @import "../../assets/styles/base/constants";
    @import "../../assets/styles/base/mixin";
.sdx-slidebar {
    height: 100%;
    width: $ls-siderbar;
    overflow: hidden;
    position: relative;
    .logo {
        background: $sdx-primary-color;
        position: relative;
        width: 100%;
        height: $ls-headerbar;
        text-align: center;
        transition: all 0.1s ease-out;
        .inner {
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
                width: 30px;
                height: 30px;
                position: absolute;
                left: 50%;
                top: 15px;
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
    .collapse-toggler {
        position: absolute;
        right: 16px;
        bottom: 24px;
        cursor: pointer;
        color: #fff;
        background: #013293;
        border-radius: 4px;
        width: 48px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        z-index: 10;
        opacity: 0.5;
        &:hover {
            opacity: 1;
        }
        i {
            font-size: 20px;
            display: inline-block;
            will-change: transfrom;
            transition: transform ease-in .3s;
            transform: rotate(180deg);
        }
        &.is-collapse {
            transform: translateX(-169px);
            i {
                transform: rotate(0);
            }
        }
    }
}
</style>
