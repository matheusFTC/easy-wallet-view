import getters from '@/store/authentication/getters';
import mutations from '@/store/authentication/mutations';
import actions from '@/store/authentication/actions';

export default {
  state: {
    expires: null,
    token: null,
    loggedUser: null,
  },
  getters,
  mutations,
  actions,
  namespaced: true,
};
