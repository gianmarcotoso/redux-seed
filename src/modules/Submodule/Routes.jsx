import React from 'react'
import { Route } from 'react-router'

import Submodule from './components/Submodule'

export default function routes(store) {
	return (
        <Route path="/sub" component={Submodule}></Route>
    )
}
