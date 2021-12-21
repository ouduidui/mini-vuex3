let Vue; // 保存Vue的构造函数，插件中需要用到

class Store {
	/*
	 * options:
	 *   state
	 *   mutations
	 *   actions
	 *   modules
	 *   getters
	 * */
	constructor(options = {}) {
		// data响应式处理
		this._vm = new Vue({
			data: {
				$$state: options.state // 通过this._vm._data.$$state 或 this._vm.$data.$$state 获取
			}
		});

		// 保存用户配置的mutations选项和actions选项
		this._mutations = options.mutations;
		this._actions = options.actions;

		// 将commit和dispatch绑定this，
		this.commit = this.commit.bind(this);
		this.dispatch = this.dispatch.bind(this);

		// 初始化getters，默认为一个空对象
		this.getters = {};

		// 遍历options.getters
		for (const key in options.getters) {
			const self = this;
			Object.defineProperty(
				this.getters,
				key, // key名
				{
					get() {
						// 调用对应的函数，第一个参数为state，将结果返回
						return options.getters[key](self._vm._data.$$state);
					}
				}
			);
		}
	}

	// 获取state
	get state() {
		return this._vm._data.$$state;
	}

	// 不可设置state
	set state(v) {
		console.error('please use replaceState to reset state');
	}

	commit(type, payload) {
		// 获取type对应的mutation
		const entry = this._mutations[type];
		if (!entry) {
			console.error(`unknown mutation type : ${type}`);
			return;
		}

		// 传递state和payload给mutation
		entry(this.state, payload);
	}

	dispatch(type, payload) {
		// 获取用户编写的type对应的action
		const entry = this._actions[type];
		if (!entry) {
			console.error(`unknown action type : ${type}`);
		}
		// 异步结果处理常常需要返回Promise
		return entry(this, payload);
	}
}

function install(_Vue) {
	Vue = _Vue;

	Vue.mixin({
		beforeCreate() {
			// 挂载$store
			if (this.$options.store) {
				Vue.prototype.$store = this.$options.store; // vm.$store
			}
		}
	});
}

export default { Store, install };
