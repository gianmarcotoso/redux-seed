import { createStructuredSelector } from 'reselect'
import provide from 'core/Provide'

import * as ActionCreators from 'data/sources/Counter/ActionCreators'

const counterSelector = state => state.counter.get('count')
const select = createStructuredSelector({
	count: counterSelector
})

export default provide(select, ActionCreators)
