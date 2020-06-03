import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
    isLoading: false,
    premium: false,
  },
  mutations: {
    SWITCH_LOGIN(state, { username, premium }) {
      state.isLogin = true;
      state.username = username;
      state.premium = premium;
    },
    SWITCH_LOGOUT(state) {
      state.isLogin = false;
      state.username = '';
      state.premium = false;
    },
    START_LOADING(state) {
      state.isLoading = true;
    },
    FINISH_LOADING(state) {
      state.isLoading = false;
    },
    SWITCH_PREMIUM(state) {
      state.premium = true;
    },
  },
  actions: {
  },
  modules: {
  },
});
