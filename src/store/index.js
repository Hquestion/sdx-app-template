import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import getters from './getters';
import dataset from './modules/dataset';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        user,
        dataset
    },
    getters
});

console.log('--', store);

export default store;
