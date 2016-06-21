import Module from 'core/Module'

import Routes from './Routes'

const module = new Module(
	'submodule',
	null,
	Routes
)

module.submoduleOf('home')

export default module
