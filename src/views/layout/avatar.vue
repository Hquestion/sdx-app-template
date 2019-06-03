<template>
    <div class="sdx-avatar">
        <SdxuButton
            type="default"
            trigger="click"
            :shadow="true"
            icon="iconfont iconicon-jiankongzhongxin1"
            v-show="$route.meta.system !== 'manage'"
        >
            {{ $t('manage_plateform') }}
            <template slot="dropdown">
                <SdxuButton
                    type="text"
                    :block="true"
                    @click="goManage('source')"
                >
                    {{ $t('sourcemanage') }}
                </SdxuButton>
                <SdxuButton
                    type="text"
                    :block="true"
                    @click="goManage('user')"
                >
                    {{ $t('usermanage') }}
                </SdxuButton>
                <SdxuButton
                    type="text"
                    :block="true"
                    @click="goManage('rights')"
                >
                    {{ $t('rightsmanage') }}
                </SdxuButton>
                <SdxuButton
                    type="text"
                    :block="true"
                    @click="goManage('monitor')"
                >
                    {{ $t('monitormanage') }}
                </SdxuButton>
            </template>
        </SdxuButton>
        <div
            class="split-line"
            v-show="$route.meta.system !== 'manage'"
        />
        <SdxuButton
            type="text"
            trigger="click"
            style="margin-right: 14px;min-width: 0;"
            dropdown-width="90px"
        >
            {{ langTextMap[currentLang] }}
            <template slot="dropdown">
                <SdxuButton
                    type="text"
                    :block="true"
                    @click="currentLang='zh-CN'"
                >
                    {{ langTextMap['zh-CN'] }}
                </SdxuButton>
                <SdxuButton
                    type="text"
                    :block="true"
                    @click="currentLang='en'"
                >
                    {{ langTextMap['en'] }}
                </SdxuButton>
            </template>
        </SdxuButton>
        <el-dropdown
            class="avatar-container"
            trigger="click"
            @command="onCommand"
        >
            <div class="avatar-wrapper">
                <div
                    class="avatar-box"
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
                <el-dropdown-item
                    class="account-container"
                    command="userInfo"
                >
                    <div class="account-dropdown-item">
                        <div class="dropdown-avatar-box">
                            <img
                                class="user-avatar"
                                src="../../assets/images/user-s.png"
                            >
                        </div>
                        <div class="account-info">
                            <div class="user-name">
                                {{ userMeta.fullName }}
                            </div>
                            <div class="user-role">
                                {{ userMeta.roleNames && userMeta.roleNames[0] }}
                            </div>
                        </div>
                    </div>
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    command="modifyPassword"
                >
                    修改密码
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    command="versioninfo"
                >
                    版本信息
                </el-dropdown-item>
                <el-dropdown-item
                    divided
                    command="logout"
                >
                    <span>
                        退出登录
                    </span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <SdxwUserInfoDialog
            :visible.sync="userInfoVisible"
            :user-info-data="userMeta"
            theme="dashboard"
            @confirmUser="confirmUser"
        />
        <SdxwChangePassword :visible.sync="modifyPwdVisible" />
        <sdxu-dialog
            :visible.sync="versionVisible"
            no-footer
            title-icon="iconicon-banbenxinxi"
            title="版本信息"
        >
            <div class="dashboard-version-content">
                <div>SkyDiscovery</div>
                <div>版本号： X</div>
                <div>南京天数智芯科技有限公司</div>
            </div>
        </sdxu-dialog>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import { version } from '../../../package';

export default {
    data() {
        return {
            dialogVisible: false,
            version,
            currentLang: 'zh-CN',
            langTextMap: {
                'zh-CN': '中文',
                en: 'English'
            },
            userInfoVisible: false,
            modifyPwdVisible: false,
            versionVisible: false
        };
    },
    computed: {
        ...mapState({
            userMeta: state => state.user && state.user.user || {}
        })
    },
    methods: {
        ...mapActions(['toggleGuide', 'userInfo']),
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$store.commit('removeAll');
                this.$router.push({ path: '/login' });
            });
        },
        showUserInfo() {
            this.userInfoVisible = true;
        },
        modifyPassword() {
            this.modifyPwdVisible = true;
        },
        versioninfo() {
            this.versionVisible = true;
        },
        goManage(type) {
            // todo 跳转管理页面
            const typeRouterMap = {
                source: '/#/sdxv-resource-manage',
                user: '/#/sdxv-user-manage',
                rights: '/#/authorize-manage'
            };
            window.open(typeRouterMap[type]);
        },
        onCommand(command) {
            const commandMap = {
                logout: this.logout,
                userInfo: this.showUserInfo,
                modifyPassword: this.modifyPassword,
                versioninfo: this.versioninfo
            };
            commandMap[command]();
        },
        // 组件传过来的值更新vuex里面的用户信息
        confirmUser(data) {
            this.$store.commit('SET_USER', data);
        }
    },
    mounted() {
        this.userInfo();
    },
    watch: {
        currentLang(val) {
            this.$i18n.locale = val;
        }
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
        .split-line {
            display: inline-block;;
            width: 1px;
            height: 20px;
            background: #BBC4CF;;
            vertical-align: middle;
            margin-left: 14px;
            margin-right: 14px;
        }
    }
    .avatar-container {
        .avatar-wrapper {
            cursor: pointer;
            position: relative;
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
        pointer-events: auto;
        background: $sdx-color-primary;
        padding-left: 20px;
        display: inline-block;
        border: none;
        &:hover, &:active {
            background-color: $sdx-color-primary !important;
            color: #fff !important;
        }
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

    .dashboard-version-content {
        text-align: center;
        div {
            height: 32px;
        }
        div:first-child {
            font-family:SourceHanSansCN-Medium;
            font-weight:500;
            color:rgba(48,49,51,1);
        }
        div:nth-child(n+1) {
            font-family:SourceHanSansCN-Normal;
            font-weight:400;
            color:rgba(48,49,51,1);
        }
    }
</style>
