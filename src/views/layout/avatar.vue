<template>
    <div class="sdx-avatar">
        <sdxui-button>中文</sdxui-button>
        <el-dropdown
            class="avatar-container"
            trigger="click"
        >
            <div class="avatar-wrapper">
                <div
                    class="avatar-box"
                >
                    <img
                        class="user-indicator-icon"
                        :src="userIcon"
                    >
                    <img
                        class="user-avatar"
                        src="../../assets/images/user-s.png"
                    >
                    <i class="el-icon-caret-bottom" />
                </div>
            </div>
            <el-dropdown-menu
                class="user-dropdown"
                slot="dropdown"
            >
                <el-dropdown-item class="account-container">
                    <div class="account-dropdown-item">
                        <div class="dropdown-avatar-box">
                            <img
                                class="user-avatar"
                                src="../../assets/images/user-s.png"
                            >
                            <img
                                class="user-indicator-icon"
                                :src="userIcon"
                            >
                        </div>
                        <div class="account-info">
                            <div class="user-name">
                                {{ userInfo.fullname }}
                            </div>
                            <div class="user-role">
                                {{ userInfo.role && userInfo.role.name }}
                            </div>
                        </div>
                    </div>
                </el-dropdown-item>
                <router-link
                    class="inlineBlock"
                    to="/userInfo"
                >
                    <el-dropdown-item divided>
                        修改密码
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                    <span
                        @click="logout"
                        style="display:block;"
                    >
                        退出登录
                    </span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { version } from '../../../package';

const BASE_API = process.env.VUE_APP_BASE_API;
const groupManagerIcon = require('../../assets/images/group-manager.png');
const adminIcon = require('../../assets/images/admin.png');
export default {
    data() {
        return {
            dialogVisible: false,
            version
        };
    },
    computed: {
        ...mapState({
            userInfo: state => state.user && state.user.user || {}
        }),
        isAdmin() {
            return this.userInfo.role.name === 'admin';
        },
        userIcon() {
            const map = {
                admin: adminIcon,
                group_admin: groupManagerIcon
            };
            return this.userInfo.role && map[this.userInfo.role.name] || '';
        }
    },
    methods: {
        ...mapActions(['toggleGuide']),
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$store.commit('removeAll');
                this.$router.push({ path: '/login' });
            });
        },
        handleJumpToUserGuide() {
            let url = `${BASE_API}/help/index.html`;
            window.open(url);
        },
        handleAbout() {
            // this.dialogVisible = true;
            this.$router.push('/about');
        },
        handleJumpToSkyManager() {
            let url = '/v2/skymanager/';
            window.open(url);
        }
    },
    beforeCreate() {
        this.$store.dispatch('currentUser').then(() => ({}));
    }
};
</script>
<style lang="scss" scoped>
    .sdx-avatar {
        position: relative;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    .avatar-container {
        .avatar-wrapper {
            cursor: pointer;
            position: relative;
            .split-line {
                display: inline-block;;
                width: 1px;
                height: 10px;
                background: #f2f2f2;
                vertical-align: middle;
                margin-right: 10px;
            }
            .avatar-box {
                position: relative;
                width: 45px;
                height: 30px;
                .user-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    display: block;
                }

                .el-icon-caret-bottom {
                    position: absolute;
                    right: 0;
                    top: 12px;
                    font-size: 12px;
                    color: #dedede;
                }
                .user-indicator-icon {
                    position: absolute;
                    right: 0px;
                    bottom: 9px;
                }
            }
        }
    }
    .account-container {
        pointer-events: none;
        background: $sdx-color-primary;
        padding-left: 20px;
        display: inline-block;
        border: none;
        .account-dropdown-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            line-height: 1.5;
            .dropdown-avatar-box {
                width: 30px;
                height: 30px;
                position: relative;
                .user-indicator-icon {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                }
            }

            .account-info {
                margin-left: 10px;
                .user-name {
                    font-size: 14px;
                    color: #fff;
                }
                .user-role {
                    font-size: 12px;
                    color: #fff;
                    opacity: 0.8;
                    font-family: siyuan-lt;
                    margin-top: 3px;
                }
            }
        }
    }

</style>
<style lang="scss">
    .user-dropdown {
        border: none !important;
        top: 60px !important;
        margin-top: 0 !important;
        border-radius: 0 !important;

        .popper__arrow {
            display: none !important;
        }

        &.el-dropdown-menu {
            margin: 0;
            padding: 0;
        }

        .el-dropdown-menu__item {
            line-height: 36px;
            min-width: 180px;
        }

        .el-dropdown-menu__item--divided {
            margin-top: 0;
        }

        .el-dropdown-menu__item--divided:before {
            height: 0;
        }
    }
</style>
