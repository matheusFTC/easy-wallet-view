import getters from '@/store/asset/getters';
import mutations from '@/store/asset/mutations';
import actions from '@/store/asset/actions';

export default {
  state: {
    assets: [],
    asset: null,
  },
  getters,
  mutations,
  actions,
  namespaced: true,
};
