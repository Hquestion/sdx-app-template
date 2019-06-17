<template>
    <div class="login-wrap">
        <div class="login-container">
            <div class="logoTop">
                <i class="icon iconfont icon-Discovery1" />
                <span>大数据机器学习平台</span>
            </div>
            <el-form
                auto-complete="on"
                :model="loginForm"
                ref="loginForm"
                label-position="left"
                label-width="0px"
                class="card-box login-form"
            >
                <p class="wtitle">
                    欢迎来到
                </p>
                <div class="login-logo">
                    <img
                        src="../../assets/images/login/Discovery.png"
                        style="width: 100%;"
                    >
                    <!-- <wscn-icon-svg icon-class="Discovery1"></wscn-icon-svg> -->
                </div>
                <p class="wtitle">
                    用户名
                </p>
                <el-form-item
                    prop="username"
                    tabindex="0"
                >
                    <el-input
                        name="username"
                        type="text"
                        v-model="loginForm.username"
                        tabindex="1"
                        :autofocus="true"
                        placeholder="请输入用户名"
                    >
                        <i
                            slot="prefix"
                            class="iconfont icon-user form-ico"
                        />
                    </el-input>
                </el-form-item>
                <p class="wtitle">
                    密码
                </p>
                <el-form-item
                    prop="passwd"
                    tabindex="0"
                >
                    <el-input
                        name="passwd"
                        type="password"
                        tabindex="2"
                        @keyup.enter.native="handleLogin"
                        v-model="loginForm.passwd"
                        placeholder="请输入密码"
                    >
                        <i
                            slot="prefix"
                            class="iconfont icon-pwd form-ico"
                        />
                    </el-input>
                </el-form-item>
                <el-form-item class="form-submit">
                    <el-button
                        type="primary"
                        style="width:100%;"
                        tabindex="3"
                        :loading="loading"
                        @click.native.prevent="handleLogin"
                    >
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="copy-right">
                Copyright © 2018 南京天数智芯科技有限公司. 版权所有 <br> 备案号：苏ICP备16013291号
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                username: '',
                passwd: ''
            },
            loading: false,
            showDialog: false
        };
    },
    computed: {},
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store
                        .dispatch('login', { username: this.loginForm.username, password: this.loginForm.passwd })
                        .then(() => {
                            this.loading = false;
                            // 设置显式登陆状态
                            this.$store.commit('SET_EXPLICIT_LOGIN');
                            this.$router.push({ name: 'Home' });
                        })
                        .catch(() => {
                            this.loading = false;
                            // this.$router.push({ path: '/login' });
                        });
                } else {
                    // this.$message.error('提交错误！');
                    return false;
                }
            });
        }
    }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login-wrap {
    background: linear-gradient(47deg, #3e8ef5, #3b17d7);
    background-size: cover;
    height: 100%;
    .logoTop {
        top: 34px;
        left: 40px;
        position: absolute;
        i {
            color: #fff;
            font-size: 22px;
        }
        span {
            font-size: 16px;
            font-family: siyuan-bd;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            position: relative;
            top: -2px;
            margin-left: 5px;
            display: inline-block;
        }
    }
    .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }
    .login-container {
        user-select: none;
        overflow: hidden;
        .bgn {
            position: absolute;
            width: 80vw;
            bottom: 0;
            min-width: 1500px;
        }
        @include relative;
        // height: 100vh;
        // background-color: #2d3a4b;
        // background-image: url(../../assets/images/login/bgn.png);
        // background-position: center center;
        background-image: url('../../assets/images/login/login.svg');
        background-size: cover;
        background-position: left center;
        background-repeat: no-repeat;
        .copy-right {
            color: #dedede;
            font-size: 14px;
            position: absolute;
            bottom: 50px;
            width: max-content;
            left: 0;
            right: 0;
            margin: 0 auto;
            text-align: center;
        }
        input:-webkit-autofill {
            box-shadow: 0 0 0px 1000px #fff inset !important;
            -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        }
        input {
            background-color: transparent !important;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: #000;
            height: 40px;
        }
        .el-input {
            display: inline-block;
            // height: 40px;
            background: #fff;
            .form-ico {
                font-size: 20px;
            }
        }
        input:-webkit-autofill {
            background-color: transparent !important;
        }
        .svg-container {
            padding: 6px 5px 6px 15px;
            color: #889aa4;
        }

        .title {
            font-size: 26px;
            font-weight: 400;
            color: #eeeeee;
            margin: 0px auto 0px auto;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            background-image: url(../../assets/images/login/bk.png);
            padding: 20px 36px;
            position: absolute;
            right: 10vw;
            width: 375px;
            background: rgba(246, 247, 255, 1);
            height: 410px;
            // padding: 0 41px;
            // margin: 120px auto;
            // background-color: #fff;
            bottom: 0;
            top: calc(50vh - 200px);
            border-radius: 5px;
            // border: 6px solid rgba(255, 255, 255, 0.2);
            background-clip: padding-box;
            .form-submit {
                border: none;
            }
            .login-logo {
                width: 167px;
                height: 20px;
                margin: 20px 0 30px;
            }
        }
        .wtitle {
            font-size: 14px;
            font-weight: 300;
            color: #3c84c6;
            font-family: siyuan-rg;
            margin-bottom: 5px;
        }
        .el-form-item {
            // border: solid 1px #dde0e2;
            border-radius: 2px;
            background: transparent;
            color: #000;
            .el-input__inner {
                border: 1px solid #a5c6e5 !important;
            }
            .el-input__inner:focus {
                // box-shadow: inset 0px 1px 5px 0px rgba(0, 164, 238, 0.5);
                border: 1px solid #3c84c6 !important;
            }
            .el-input__prefix {
                left: 10px;
            }

            width: 300px;
            margin: 0 auto 25px;
        }

        .forget-pwd {
            color: #fff;
        }
        .form-submit {
            button {
                margin-top: 20px;
                // background-image: url(../../assets/images/login/bluebox.png);
                background: linear-gradient(
                    47deg,
                    rgba(33, 110, 231, 1) 0%,
                    rgba(50, 98, 215, 1) 100%
                );
            }
        }
    }
}
</style>
