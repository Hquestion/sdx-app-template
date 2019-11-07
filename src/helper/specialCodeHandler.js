import store from '../store';
import router from '../router';

function unauthorizeHandler() {
    store.commit('REMOVE_ALL');
    const path = encodeURIComponent(location.href);
    router.replace('/login', {
        query: {
            redirect: path
        }
    });
}

export default {
    401: unauthorizeHandler
};
