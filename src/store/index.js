import { createStore } from "vuex";
import { readFileAndRenderHtml } from '../util/file';

export const store = createStore({
  state() {
    return {
      currentViewHtml: "",
      currentViewFilePath: ""
    };
  },
  mutations: {
    setCurrentViewHtml(state, html) {
      state.currentViewHtml = html;
    },
    setCurrentViewFilePath(state, path) {
      state.currentViewFilePath = path;
    }
  },
  actions: {
    renderNewHtmlFromFilePath({ commit }, path) {
      commit('setCurrentViewFilePath', path);
      commit('setCurrentViewHtml', readFileAndRenderHtml(path));
    },
  },
});
