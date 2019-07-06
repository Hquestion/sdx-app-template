import store from '../store';
import router from '../router';

function unauthorizeHandler() {
    store.commit('REMOVE_ALL');
    router.replace('/login');
}

export default {
    401: unauthorizeHandler
};
