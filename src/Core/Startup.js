import Home from 'Modules/Home'

export default async function(app, done, error) {
	console.log(`Application '${app.name}' is starting...`)

	app.register(Home)

	app.onBeforeStart(next => {
		console.log('Preparing to render, waiting a bit...')

		setTimeout(next, 5000)
	})

	done()
}
