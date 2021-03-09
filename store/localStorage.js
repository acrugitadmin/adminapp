export const state = () => ({})

export const mutations = {
  updateData(state, info) {
    state.anyValues = info
  },
  updateState(state, info) {
    state.status = info
  },
  deleteData(state, info) {
    state.anyValues = null
    state.status = null
  },
}
