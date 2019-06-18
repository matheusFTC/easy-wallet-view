import Vue from 'vue';
import Vuex from 'vuex';

import asset from '@/store/asset';
import authentication from '@/store/authentication';
import note from '@/store/note';
import user from '@/store/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  modules: {
    asset,
    authentication,
    note,
    user,
  },
});

export default store;
