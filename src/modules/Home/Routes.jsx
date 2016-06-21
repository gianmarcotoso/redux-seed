import React from 'react'
import { Route } from 'react-router'

import Home from './components/Home'

export default function routes(store, children = null) {
	return (
        <Route path="/" component={Home}>{children}</Route>
    )
}
