import Module from 'core/Module'

import Reducer from './Reducer'

const datasource = new Module(
	'counter', Reducer
)

export default datasource
