<script>
export default {
    name: 'Main',
    data() {
        return {
            current: ''
        };
    },
    props: {
        collapse: {
            type: Boolean,
            default: false
        },
        menus: {
            type: Array,
            default: () => []
        }
    },
    watch: {
        menus: {
            immediate: true,
            handler(val) {
                if (val) {
                    // todo
                }
            }
        }
    },
    render() {
        const { menus, current, collapse } = this;
        return (
            <div class={{ 'sdx-menu': true, 'is-collapse': collapse }} >
                <el-menu defaultActive={current}
                    class="el-menu-vertical-demo"
                    collapse={collapse}
                    uniqueOpened={true}
                    backgroundColor="#1144AB"
                    textColor="#FFF"
                    activeTextColor="#FFF"
                    router={true}
                >
                    {
                        menus.map(menu => {
                            const { path, name, icon, children } = menu;
                            if (children && children.length > 0) {
                                return (
                                    <el-submenu index={path} popperClass="sdx-menu-popup">
                                        <template slot="title">
                                            <i class={icon} />
                                            <span slot="title">{name}</span>
                                        </template>
                                        {
                                            children.map(child => (
                                                <el-menu-item index={child.path}>
                                                    <i class={child.icon}/>
                                                    <span slot="title">{child.name}</span>
                                                </el-menu-item>
                                            ))
                                        }
                                    </el-submenu>
                                );
                            } else {
                                return (
                                    <el-menu-item index={path}>
                                        <i class={icon}/>
                                        <span slot="title">{name}</span>
                                    </el-menu-item>
                                );
                            }
                        })
                    }
                </el-menu>
            </div>
        );
    },
    mounted() {
        this.current = this.$route.fullPath;
    }
};
</script>

<style lang="scss" scoped>
    .el-menu-item {
        height: 48px !important;
        line-height: 48px !important;
        margin-top: 0px;
        margin-bottom: 0px;
        border-radius: 4px;
    }
    .sdx-menu {
        padding: 0 16px;
        position: relative;
        &.is-collapse {
            padding: 0 8px;
        }
        & /deep/ {
            .el-menu {
                border: none;
                &.el-menu--collapse {
                    width: 48px;
                    .el-menu-item {
                        padding-left: 14px !important;
                        i {
                            margin-left: -6px;
                        }
                    }
                    .el-submenu__title {
                        padding-left: 14px !important;
                    }
                }
                .el-menu-item {
                    height: 48px;
                    line-height: 48px;
                    margin: 0;
                    i {
                        color: #fff;
                        font-size: 20px;
                        margin-right: 16px;
                    }
                    &.is-active {
                        background: #013293 !important;
                    }
                }
                .el-submenu__title {
                    height: 48px;
                    line-height: 48px;
                    margin: 0;
                    i {
                        color: #fff;
                        font-size: 20px;
                        margin-right: 16px;
                    }
                    &.is-active {
                        background: #013293 !important;
                    }
                }
            }
        }
    }
</style>
