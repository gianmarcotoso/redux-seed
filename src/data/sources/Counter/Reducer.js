import reduceWith from 'core/ReduceWith'
import DefaultState from './DefaultState'
import {
    INCREMENT_COUNTER,
    RESET_COUNTER
} from './Actions'

const mutators = {
	[INCREMENT_COUNTER]: (state, action) => ({...state, count: state.count + 1}),
	[RESET_COUNTER]: {
		count: 0
	}
}

export default reduceWith(mutators, DefaultState)
