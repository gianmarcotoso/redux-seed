import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

export default async function (store) {
	return new Promise( (resolve) => {
		setTimeout( () => {
			resolve(syncHistoryWithStore(browserHistory, store))
		}, 2000)
	})
}
