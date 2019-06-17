<template>
    <div class="navbar">
        <i class="iconfont iconicon-shousuo toggle-icon" @click="toggleSideBar"></i>
        <avatar />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import errLogStore from 'store/errLog';
import avatar from './avatar';
export default {
    components: {
        avatar
    },
    data() {
        return {
            log: errLogStore.state.errLog,
            isShow: true
        };
    },
    computed: {
        ...mapGetters(['sidebar'])
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar');
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: $ls-headerbar;
    line-height: $ls-headerbar;
    border-radius: 0px !important;
    z-index: 3;
    min-width: 800px;
    background: white;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: $ls-content-margin;
    width: 100%;
    .toggle-icon {
        color: $sdx-text-minor-color;
        font-size: 24px;
        padding: 0 10px;
        cursor: pointer;
    }
}
</style>
