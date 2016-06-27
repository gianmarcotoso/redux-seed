import {
	POPULATE
} from './Actions'

export function getFromServer(id = null) {
	return async dispatch => {
		const posts = await http.get(`${config.server}/posts`)

		dispatch({type: POPULATE, posts})
	}
}

export function getFromFake() {
	return {
		type: POPULATE,
		posts: [{
			id: 1,
			title: 'Hello, world!',
			content: 'A lot of words'
		}, {
			id: 2,
			title: 'The Count of Montecristo',
			content: 'A story of revenge'
		}, {
			id: 3,
			title: 'Cooking with Heisenberg',
			content: 'The unexpected!'
		}]
	}
}
