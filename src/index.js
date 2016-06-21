import Application from 'core/Application'
import startup from 'bootstrap/startup'

const app = new Application(config.name)
const root = config.dom.root

app.init(startup).then(() => {
	app.start(root)
})
