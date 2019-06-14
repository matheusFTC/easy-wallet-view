import getters from '@/store/note/getters';
import mutations from '@/store/note/mutations';
import actions from '@/store/note/actions';

export default {
  state: {
    notes: [],
    note: null,
  },
  getters,
  mutations,
  actions,
  namespaced: true,
};
