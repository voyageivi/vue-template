const state = {
  count: 0
}
const getters = {
  count (state) {
    return state.count
  }
}
const mutations = {
  increment: (state) => {
    state.count += 1
  }
}
export default {
  // namespaced: true,
  state,
  getters,
  mutations
}
