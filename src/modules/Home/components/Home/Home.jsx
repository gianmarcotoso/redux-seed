import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

// Importing a datasource
import PostsDataProvider from 'datasources/Posts/DataProvider'

// Importing local module actions
import * as HomeActions from '../../Actions'

// Importing the local component
import Hello from 'components/Hello'

// Importing some CSS
import 'bootstrap/dist/css/bootstrap.css'

class Home extends Component {
	constructor(props) {
		super(props)

		this.resetCounter = this.resetCounter.bind(this)
		this.startCounting = this.startCounting.bind(this)
		this.stopCounting = this.stopCounting.bind(this)
	}

	componentDidMount() {
		this.startCounting()

		this.props.getFromFake()
	}

	componentDidUpdate(prevProps) {
		if (prevProps.posts !== this.props.posts) {
			console.log(this.props.posts.toArray())
		}
	}

	componentWillUnmount() {
		this.stopCounting()
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
                <h1>I am your homepage!</h1>
				<Hello name="Someone" />
                <p>Counting... {this.props.count}</p>

				<div className="btn-group">
					<button className="btn btn-warning" onClick={this.resetCounter}>Reset!</button>
					<button className="btn btn-danger" onClick={this.stopCounting}>Stop</button>
					<button className="btn btn-success" onClick={this.startCounting}>Start</button>
				</div>

				{this.props.children}
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

export default connect(select)(PostsDataProvider(Home))
