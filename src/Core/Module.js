import React from 'react'

class Module {
	constructor(name, reducer, routes) {
		const _name = name
		Object.defineProperty(this, 'name', {
			enumerable: true,
			get: () => _name
		})

		const _reducer = reducer
		Object.defineProperty(this, 'reducer', {
			enumerable: true,
			get: () => _reducer
		})

		const _routes = routes
		Object.defineProperty(this, 'routes', {
			enumerable: true,
			get: () => _routes
		})
	}

	submoduleOf(parent) {
		this.parent = parent
	}
}

export default Module
