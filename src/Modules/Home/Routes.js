import React from 'react'
import { Route } from 'react-router'

import Home from './Components/Home'

export default function routes(store) {
	return (
        <Route path="/" component={Home}></Route>
    )
}
