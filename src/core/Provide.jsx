import React from 'react'
import { connect } from 'react-redux'

let Wrap = (WrappedComponent) => (props) => <WrappedComponent {...props} />

function provide(select, ActionCreators) { 
	return (WrappedComponent) => connect(select, ActionCreators)(Wrap(WrappedComponent))
}

export default provide


