import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import * as ActionCreators from 'data/sources/Posts/ActionCreators'

let postsSelector = state => state.posts.items
let select = createStructuredSelector({
	posts: postsSelector
})

export default connect(select, ActionCreators)
