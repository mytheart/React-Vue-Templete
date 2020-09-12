interface objConfig {
  [key: string]: any;
}

interface stateGlobal {
  globalName: string,
  count: number,
  [key: string]: any;
}

const state: stateGlobal = {
  globalName: 'globalName',
  count: 0
};

const getters = {};

const actions = {};

const mutations = {
  SET_DATA(state: stateGlobal, payload: objConfig) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key];
    });
  },
  ADD_COUNT(state: stateGlobal, payload?: number) {
    if (typeof payload === 'number') {
      state.count += payload;
    } else {
      state.count++;
    }

  }
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
