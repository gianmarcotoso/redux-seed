function reduceWith(mutators, defaultState) {
	return function(state = defaultState, action) {
		const mutator = mutators[action.type]

		if (!mutator) {
			return state
		}

		if (mutator instanceof Function) {
			return mutator.call(null, state, action)
		}

		const mutations = Object.keys(mutator).reduce( (r, n) => {
			r[n] = mutator[n] instanceof Function ? mutator[n].call(null, action) : mutator[n]

			return r
		}, {})

		return {...state, ...mutations}
	}
}

export default reduceWith
