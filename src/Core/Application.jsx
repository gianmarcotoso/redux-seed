import React from 'react'
import ReactDOM from 'react-dom'

import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { routerReducer } from 'react-router-redux'

import EventEmitter from 'events'

import createStore from './CreateStore'
import syncStore from './SyncStore'

class Application extends EventEmitter {
	constructor(name) {
		super()

		const _name = name
		Object.defineProperty(this, 'name', {
			enumerable: true,
			get: () => _name
		})

		const _routes = []
		Object.defineProperty(this, 'routes', {
			enumerable: false,
			get: () => _routes
		})

		const _reducers = {
			routing: routerReducer
		}
		Object.defineProperty(this, 'reducers', {
			enumerable: false,
			get: () => _reducers
		})
	}

	register(module) {
		if (module.routes) {
			this.routes.push(module.routes)
		}

		if (module.reducer) {
			this.reducers[module.name] = module.reducer
		}

		this.emit('moduleDidRegister', this, module)
	}

	init(callback) {
		return new Promise((resolve, reject) => {
			callback(this, resolve, reject)
		})
	}

	async start(id) {
		const root = document.getElementById(id)
		if (!root) {
			throw new Error(`Node #${id} does not exist!`)
		}

        // Create the store, see Core/CreateStore.js
		const _store = createStore(combineReducers(this.reducers))
		Object.defineProperty(this, 'store', {
			enumerable: true,
			get: () => _store
		})

		// Sync history with store, see Core/SyncStore.js
		const _history = await syncStore(_store)
		Object.defineProperty(this, 'history', {
			enumerable: false,
			get: () => _history
		})

		ReactDOM.render(
			<Provider store={this.store}>
				<Router history={this.history}>
					{this.routes.map((r,i) =>
						React.cloneElement(r(this.store), {key: i})
					)}
				</Router>
			</Provider>,
			root
		)

		this.emit('applicationDidStart', this)
	}
}

export default Application
