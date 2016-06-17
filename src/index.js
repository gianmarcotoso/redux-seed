import Application from 'Core/Application'
import Startup from 'Core/Startup'

const app = new Application(config.name)
const root = config.dom.root

app.init(Startup).then(() => {
	app.start(root)
})
