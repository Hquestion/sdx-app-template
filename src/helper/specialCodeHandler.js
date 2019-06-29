import store from '../store';

function unauthorizeHandler() {
    store.commit('REMOVE_ALL');
    this.$router.replace('/login');
}

export default {
    401: unauthorizeHandler
};
