import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/user';
import authentication from '@/store/authentication';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    user,
    authentication,
  },
});

export default store;
