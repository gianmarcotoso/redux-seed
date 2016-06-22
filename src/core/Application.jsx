import React from 'react'
import ReactDOM from 'react-dom'

import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import { routerReducer } from 'react-router-redux'

import EventEmitter from 'events'

import createStore from 'bootstrap/createStore'
import syncStore from 'bootstrap/syncStore'

class Application extends EventEmitter {
	constructor(name) {
		super()

		const _name = name
		Object.defineProperty(this, 'name', {
			enumerable: true,
			get: () => _name
		})

		const _reducers = {
			routing: routerReducer
		}
		Object.defineProperty(this, 'reducers', {
			enumerable: false,
			get: () => _reducers
		})

		const _modules = []
		Object.defineProperty(this, 'modules', {
			enumerable: true,
			get: () => _modules
		})
	}

	register(module) {
		if (module.reducer) {
			this.registerReducer(module.name, module.reducer)
		}

		this.modules.push(module)

		this.emit('moduleDidRegister', this, module)
	}

	registerReducer(name, reducer) {
		this.reducers[name] = reducer
	}

	resolveRoutes() {
		let routes = this.modules
			.filter(m => !m.parent)
			.filter(m => !!m.routes)
			.map(m => this.resolveRoutesForModule(m))

		return routes
	}

	resolveRoutesForModule(m) {
		let children = this
			.getSubmodulesOf(m)
			.filter(m => !!m.routes)
			.map((c, i) => this.resolveRoutesForModule(c))

		return React.cloneElement(m.routes(this.store, children), {key: m.name})
	}

	getSubmodulesOf(module) {
		return this.modules.filter(m => m.parent === module.name)
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

        // Create the store, see bootstrap/createStore.js
		const _store = createStore(combineReducers(this.reducers))
		Object.defineProperty(this, 'store', {
			enumerable: true,
			get: () => _store
		})

		// Sync history with store, see bootstrap/syncStore.js
		const _history = await syncStore(_store)
		Object.defineProperty(this, 'history', {
			enumerable: false,
			get: () => _history
		})

		ReactDOM.render(
			<Provider store={this.store}>
				<Router history={this.history}>
					{this.resolveRoutes()}
				</Router>
			</Provider>,
			root
		)

		this.emit('applicationDidStart', this)
	}
}

export default Application
