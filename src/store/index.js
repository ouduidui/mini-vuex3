import Vue from 'vue';
import Vuex from '../../lib/vuex';

// this.$store
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		counter: 0
	},
	mutations: {
		add(state) {
			state.counter++;
		}
	},
	actions: {
		add({ commit }) {
			setTimeout(() => {
				commit('add');
			}, 1000);
		}
	},
	getters: {
		doubleCount(state) {
			return state.counter * 2;
		}
	},
	modules: {}
});
