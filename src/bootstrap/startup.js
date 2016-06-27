import Home from 'modules/Home'
import Submodule from 'modules/Submodule'

import Posts from 'data/sources/Posts'
import Counter from 'data/sources/Counter'

// Use this function to register your modules and/or your datasources, or your
// event listeners. The Redux Store is not yet available at this point
export default async function(app, done, error) {
	console.log(`Application '${app.name}' is starting...`)

	app.register(Home)
	app.register(Submodule)

	app.register(Posts)
	app.register(Counter)

	app.on('applicationDidStart', async function(app) {

	})

	done()
}
