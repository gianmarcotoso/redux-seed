import Application from 'Core/Application'
import startup from 'Core/Startup'

const app = new Application(config.name)
const root = config.dom.root

app.init(startup).then(() => {
	app.start(root)
})
