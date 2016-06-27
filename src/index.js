import Application from 'core/Application'
import startup from 'bootstrap/startup'
import ready from 'bootstrap/ready'

const app = new Application(config.name)
const root = config.dom.root

app.init(startup).ready(ready).start(root)
