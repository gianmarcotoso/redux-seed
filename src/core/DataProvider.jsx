import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

let Wrap = (WrappedComponent, Actions) => {
	const defaultBoundActionCreators = []

	class Wrapper extends React.Component {
		constructor(props) {
			super(props)
		}

		render() {
			let boundActionCreators = bindActionCreators(Actions, this.props.dispatch)

			return <WrappedComponent {...this.props} {...boundActionCreators} />
		}
	}

	return Wrapper
}

let provide = function(select, ActionCreators) {
	return (WrappedComponent) => connect(select)(Wrap(WrappedComponent, ActionCreators))
}

export default provide
