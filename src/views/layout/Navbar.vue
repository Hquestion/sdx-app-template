<template>
    <div class="navbar">
        <Hamburger
            class="hamburger-container"
            :toggle-click="toggleSideBar"
            :is-active="sidebar.opened"
        />
        <avatar />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Hamburger from 'components/Hamburger';
import errLogStore from 'store/errLog';
import avatar from './avatar';
export default {
    components: {
        Hamburger,
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
    .hamburger-container {
        height: 56px;
        float: left;
        line-height: 64px;
        padding: 0 10px;
        color: #d1d1d1;
    }
}
</style>
