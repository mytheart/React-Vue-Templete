const state = {};

const getters = {};

const actions = {};

const mutations = {
  SET_DATA(state, payload = {}) {
    state.adminInfo = payload;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
