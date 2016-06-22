import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createSelector, createStructuredSelector } from 'reselect'

import * as ActionCreators from './ActionCreators'

let postsSelector = state => state.posts.get('list')
let select = createStructuredSelector({
	posts: postsSelector
})

let Wrap = (WrappedComponent, Actions) => {
	class Wrapper extends React.Component {
		render() {
			const boundActionCreators = bindActionCreators(Actions, this.props.dispatch)

			return <WrappedComponent {...this.props} {...boundActionCreators} />
		}
	}

	return Wrapper
}

const DataProvider = WrappedComponent => Wrap(connect(select)(WrappedComponent), ActionCreators)

export default DataProvider
