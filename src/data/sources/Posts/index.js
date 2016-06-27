import Module from 'core/Module'

import Reducer from './Reducer'

const datasource = new Module(
	'posts', Reducer
)

export default datasource
