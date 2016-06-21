import Home from 'modules/Home'
import Submodule from 'modules/Submodule'

export default async function(app, done, error) {
	console.log(`Application '${app.name}' is starting...`)

	app.register(Home)
	app.register(Submodule)

	app.on('applicationDidStart', async function(app) {

	})

	done()
}
