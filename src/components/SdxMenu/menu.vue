<template>
    <div class="sdx-menu">
        <router-link
            v-for="(item,index) in menuData"
            :key="index"
            :to="item.children?'':item.path"
        >
            <el-submenu
                v-if="item.children"
                :index="idx+'-'+index"
                :class="menu_is_active(item)?'is-active-p':''"
            >
                <template slot="title">
                    <span
                        class="main-menu-icon"
                        :class="item.icon"
                    />{{ item.name }}
                </template>
                <childMenu
                    :menu-data="item.children"
                    :idx="idx+'-'+index"
                >
                    {{ item.name }}
                </childMenu>
            </el-submenu>
            <el-menu-item
                v-else
                :index="idx+'-'+index"
                :class="menu_is_active(item)?'is-active2':''"
            >
                <span
                    class="main-menu-icon"
                    :class="item.icon"
                />{{ item.name }}
            </el-menu-item>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'ChildMenu',
    componentName: 'childMenu',
    data() {
        return {};
    },
    props: {
        menuData: {
            type: Array,
            default() {
                return [];
            }
        },
        idx: {
            type: [Number, String],
            default: 1
        }
    },
    methods: {
        menu_is_active(route) {
            const { path } = route;
            if (route.children) {
                for (let i = 0, len = route.children.length; i < len; i++) {
                    if (this.menu_is_active(route.children[i])) {
                        return true;
                    }
                }
                return false;
            } else {
                let curPath = this.$route.fullPath;
                let regx = new RegExp(path);
                return path !== '' && regx.test(curPath);
            }
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-submenu .el-menu-item {
    padding-left: 36px !important;
}

.el-menu,
.el-submenu {
    .el-menu-item, .el-submenu__title {
        width: 100%;
        font-size: 14px;
        border-radius: $border-radius;
        .el-menu-item {
            padding-left: 62px !important;
        }
    }

    .menu-icon {
        width: 24px;
        height: 24px;
        top: 13px;
        &::before {
            content: none;
        }
        &::after {
            content: none;
        }
    }

    .is-active2 {
        color: $white;
        position: relative;
        background: $sdx-color-primary;
    }
    .is-active-p {
        background: $sdx-color-primary;
    }
}
.main-menu-icon {
    margin-right: 26px;
    position: relative;
    top: -1px;
}
</style>
