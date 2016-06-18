import Home from 'Modules/Home'

export default async function(app, done, error) {
	console.log(`Application '${app.name}' is starting...`)

	app.register(Home)

	app.on('applicationDidStart', async function(app) {

	})

	done()
}
