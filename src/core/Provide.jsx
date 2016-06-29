import React from 'react'
import { connect } from 'react-redux'

function provide(select, ActionCreators) {
	return (WrappedComponent) => connect(select, ActionCreators)(WrappedComponent)
}

export default provide
