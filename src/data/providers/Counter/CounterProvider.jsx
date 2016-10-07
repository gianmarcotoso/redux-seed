import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as ActionCreators from 'data/sources/Counter/ActionCreators'

const counterSelector = state => state.counter.count
const select = createStructuredSelector({
	count: counterSelector
})

export default connect(select, ActionCreators)

