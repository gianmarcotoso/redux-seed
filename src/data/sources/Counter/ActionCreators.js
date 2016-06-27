import {
	INCREMENT_COUNTER,
	RESET_COUNTER
} from './Actions'

export function incrementCounter() {
	return {
		type: INCREMENT_COUNTER
	}
}

export function resetCounter() {
	return {
		type: RESET_COUNTER
	}
}
