import getters from '@/store/user/getters';
import mutations from '@/store/user/mutations';
import actions from '@/store/user/actions';

export default {
  state: {
    users: [],
    user: null,
  },
  getters,
  mutations,
  actions,
  namespaced: true,
};
