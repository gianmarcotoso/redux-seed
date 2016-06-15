import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const finalCreateStore = compose(
   applyMiddleware(thunk),
   (!config.is_production && window.devToolsExtension) ? window.devToolsExtension() : f => f
)(createStore)

export default finalCreateStore
