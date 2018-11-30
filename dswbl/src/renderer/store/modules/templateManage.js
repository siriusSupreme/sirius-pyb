const state = {
  templateId: 0
}

const mutations = {
  setTemplateIdHandler (state, id) {
    state.templateId = id
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
