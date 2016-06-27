import { createStructuredSelector } from 'reselect'
import provide from 'core/DataProvider'

import * as ActionCreators from 'data/sources/Posts/ActionCreators'

let postsSelector = state => state.posts.items
let select = createStructuredSelector({
	posts: postsSelector
})

export default provide(select, ActionCreators)
