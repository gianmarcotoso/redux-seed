import reduceWith from 'core/ReduceWith'
import DefaultState from './DefaultState'
import {
	POPULATE
} from './Actions'

const mutators = {
	[POPULATE]: {
		items: action => action.items
	}
}

export default reduceWith(mutators, DefaultState)
