import DefaultState from './DefaultState'
import {
    INCREMENT_COUNTER,
    RESET_COUNTER
} from './Actions'

export default function home(state = DefaultState, action) {
	switch(action.type) {
		case INCREMENT_COUNTER: {
			let count = state.get('count')

			return state.set('count', count + 1)
		}

		case RESET_COUNTER: {
			return state.set('count', 0)
		}

		default: {
			return state
		}
	}
}
