# Redux Application Seed

This is a barebones modularized application that uses Redux, React and React Router. Out of the box, it features:

- **[Redux](https://github.com/reactjs/redux)** for handling the business logic
- **[Redux Thunks](https://github.com/gaearon/redux-thunk)** to handle asynchronous actions
- **[ReactJS](https://facebook.github.io/react/)** as the presentation layer
- **[React Router](https://github.com/reactjs/react-router)** to handle routing
- **[Reselect](https://github.com/reactjs/reselect)** to create selectors
- **[Axios](https://github.com/mzabriskie/axios)** as its http client
- **[Bluebird](https://github.com/petkaantonov/bluebird)** as its Promise library
- **[Immutable](https://facebook.github.io/immutable-js/)** to handle immutable application states
- **[Moment](http://momentjs.com/)** to stay sane with date manipulation
- **[Lodash](https://lodash.com/)** for all those things ES6/7 doesn't do (yet)
- **[jQuery](https://jquery.com/)** because you might still need it
- **[Bootstrap](https://getbootstrap.com/)** to have a nice base style  
- **[Font Awesome](http://fontawesome.io/)** because it's awesome

Testing is done with **[Tape](https://github.com/substack/tape)** + **[Enzyme](https://github.com/airbnb/enzyme)**, while the **[Webpack](https://webpack.github.io/)** takes care of the bundling. There are also some other dependencies, check out the `package.json` file for more details!

## Before we start

This is just something I feel comfortable with, everything can and should be changed depending on your requirements. The few lines of code I've included to handle application bootstrapping are not to be considered fixed in stone and you should revise them in order to have them better fit your use case.

The code is written in ES6 with a spruce of ES7 (async/await).

## Structure

The proposed structure is the following:

```
- src 						# Source code goes here!
	- bootstrap			# All the code required to start the application
	- components		# Dumb, reusable components go here
	- config				# Configuration files go here
	- core					# Application core
	- modules				# Modules directory
	- utils 				# Utility files go here
	index.hbs				# The template for the base html file
	index.js				# The application entry point
- tests						# Tests!
```

### Bootstrap

This directory should contain all the code required to start the application. I have included 3 files, required by the core Application to start properly:

- **startup.js** is a method that is called upon startup. Use this method to register modules and do other startup operations;
- **createStore.js** defines the final implementation of the `createStore` function used by _Redux_ to create its store. Modify it to attach more middlewares or redefine the function altogether;
- **syncStore.js** is used to define the method used by _React Router Redux_ to sync its history with the Redux Store;

### Components

Put all your dumb, reusable components in here. These should be components that are used across modules and are **not** connected to the state. Since the `src` folder is resolved after `node_modules` as per `webpack.config.js`, you can `import` them anywhere by referring to them as `components/COMPONENT_NAME`.

A component is ideally composed by its own folder, containing the following files:

- **index.js** for easy `import`ing.
- **ComponentName.jsx**, where you write the code for your component
- **ComponentName.spec.jsx**, where you write the tests for your component
- **ComponentName.css** for your styles

I've included a stupid example within the directory.

### Config

You should put a config file for each of NODE_ENV you use. I've included one for the most common ones (`development`, `staging` and `production`) and one you can decide to load when testing (`test`). Except for this last one, the others are loaded by Webpack and provided as a globally available (not global) variable called `config` through the use of Webpack's `ProvidePlugin`.

The files are name as `.js.example`, copy them as plain `.js` files and modify them to your heart's content!

### Core

This directory contains the files that represent the "core" of the application.

- **Application.jsx** is a class that is instanced in `src/index.js` and is responsible for starting up the Application and rendering it to the DOM. It calls the function defined in `bootstrap/startup.js` before rendering the application for the first time and also emits a couple of events (`applicationDidStart` after the first render, `moduleDidRegister` after registering a module)

- **Module.jsx** is the class used to instance modules...

### Modules

Modules are the individual parts of your application, and each one should represent one specific "domain". It's up to you to decide how to divide the logic of your application, and much of it depends on what you're actually developing: you could decide to have a module for each "page" of your application, or one for each "feature".

Ideally, a module should be as much self-contained as possible and the only knowledge it should have of the rest of your application should come from its topmost component(s) connection to the Redux State. Even then, you should try to make a module as much application-agnostic as possible, so that you can easily reuse or replace them when needed.

A module can include some or all of the following files:

- **Actions.js**, where you define your actions and action creators;
- **Reducer.js**, where you define the module's reducer if it needs one;
- **DefaultState.js**, where you define your module's default state (if it has a reducer);
- **Routes.jsx** must (if the component has routes) export a function like this one:

```javascript
function routes(store, children = null) {
	return (
        <Route path="/" component={Home}>{children}</Route>
    )
}
```

This function returns the route(s) defined by your component, as well as those defined by its children modules (if you decide to have a hierarchical structure). You can use the store to check the state or dispatch actions on the `onEnter` hook.

In order to make a module available to your application, create an `index.js` file with an implementation like the following:

```javascript
import Module from 'core/Module'

import Routes from './Routes'
import Reducer from './Reducer'

const module = new Module(
	'my-module'			// The name of the module
	Reducer,				// The reducer object, `null` if not required
	Routes					// The routes function, `null` if not required
)

export default module
```

If you want your module to be treated as a submodule, you should also tell it the name of its parent module:

```javascript
module.submoduleOf('parent-module')
```

This will make it so that all of the routes defined by the route function will be nested to the ones defined by its parent. This will, of course, also apply to any children of the submodule itself.

In order to register a module within the application, you should use the Application's `register` method from within the `boostrap/startup.js` file:

```javascript
import MyModule from 'modules/MyModule'

export default async function(app, done, error) {
	app.register(MyModule)

	done()
}
```

### Utils

You can place all "utility" files in here, like constant definitions or stand-alone functions. You don't really have to use it though!

### Tests

Like the name suggests, all tests not related to components should be placed here. For example, I should really put tests for "core" classes in here.

## Running this thing

Not much should be required, just do an `npm install` and then `npm start` to run **Webpack Dev Server**, then go to `http://localhost:8086` to see the example application running. You can also use `npm test` to run your tests and `npm run build` to create a bundled production version (remember to create the appropriate config files!)

## TODO & THOUGHTS

- Better documentation!
- Tests: is there a better way to organize tests? Should they all be in one place? Each module should probably have its own `tests` directory to test the reducer;
- Is a `Module` class really required? A plain object is probably more than enough... unless it should have more functionality?
- Support `async/await` in tests (I should change the way `tape` is called)
- What about chunking?
