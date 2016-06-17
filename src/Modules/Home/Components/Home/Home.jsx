import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import * as HomeActions from 'Modules/Home/Actions'

class Home extends Component {
	constructor(props) {
		super(props)

		this.resetCounter = this.resetCounter.bind(this)
		this.startCounting = this.startCounting.bind(this)
		this.stopCounting = this.stopCounting.bind(this)
	}

	componentDidMount() {
		this.startCounting()
	}

	startCounting() {
		this.stopCounting()

		this.interval = setInterval(() => {
			this.props.dispatch(HomeActions.incrementCounter())
		}, 1000)
	}

	stopCounting() {
		clearInterval(this.interval)
	}

	resetCounter() {
		this.props.dispatch(HomeActions.resetCounter())
	}

	render() {
		return (
            <div>
                <h1>Hello! I am your homepage!</h1>
                <p>Counting... {this.props.count}</p>

                <button onClick={this.resetCounter}>Reset!</button>
                <button onClick={this.stopCounting}>Stop</button>
                <button onClick={this.startCounting}>Start</button>
            </div>
        )
	}
}

Home.propTypes = {

}

Home.defaultProps = {

}

let counterSelector = state => state.home.get('count')

let select = createStructuredSelector({
    										count: counterSelector
})

export default connect(select)(Home)
