import DefaultState from './DefaultState'
import {
	POPULATE
} from './Actions'

export default function(state = DefaultState, action) {
	switch(action.type) {
		case POPULATE: {
			return state.set('list', Immutable.List(action.posts))
		}

		default: {
			return state
		}
	}
}
