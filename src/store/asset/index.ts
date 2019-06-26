import getters from '@/store/asset/getters';
import mutations from '@/store/asset/mutations';
import actions from '@/store/asset/actions';

export default {
  state: {
    assets: [],
    asset: null,
    finding: false,
  },
  getters,
  mutations,
  actions,
  namespaced: true,
};
