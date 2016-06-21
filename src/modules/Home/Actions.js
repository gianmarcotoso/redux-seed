export const INCREMENT_COUNTER = 'HOME@INCREMENT_COUNTER'
export function incrementCounter() {
	return {
		type: INCREMENT_COUNTER
	}
}

export const RESET_COUNTER = 'HOME@RESET_COUNTER'
export function resetCounter() {
	return {
		type: RESET_COUNTER
	}
}
