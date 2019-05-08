<template>
    <div class="sdx-menu--main">
        <el-menu
            :unique-opened="true"
            :default-openeds="submenuIndexes"
            mode="vertical"
        >
            <SelfMenu
                :menu-data="menuData"
                :idx="idx"
            />
        </el-menu>
    </div>
</template>

<script>
import SelfMenu from './menu.vue';

export default {
    name: 'SysMenu',
    data() {
        return {
            idx: 'sky-menu'
        };
    },
    props: {
        menuData: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        SelfMenu
    },
    computed: {
        submenuIndexes() {
            let list = [];
            this.menuData.forEach((item, index) => {
                if (item.children && item.children.length > 0) {
                    list.push(`${this.idx}-${index}`);
                }
            });
            return list.slice(0, 1);
        }
    }
};
</script>

<style lang="scss" scoped>
    .sdx-menu--main {
        padding: 28px 10px;
        & /deep/ .el-menu {
            border-right: none;
        }
    }
</style>
