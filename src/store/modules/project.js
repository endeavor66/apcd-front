const state = {
  projectList: []
}

const mutations = {
  ADD_PROJECT: (state, project) => {
    state.projectList.push(project)
  },
  INIT: (state, pros) => {
    state.projectList = pros
  }
}

const actions = {
  addProject({ commit, state }, project) {
    // projectList中不存在时，才执行添加
    const repo = project.split('/')[1]
    if (state.projectList.indexOf(repo) == -1) {
      commit('ADD_PROJECT', repo)
    }
  },
  init({ commit }, pros) {
    commit('INIT', pros)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
