<h1 align="center">React-Router-Auth</h1>

> A utility library for React Router v4 for managing authentication based routing

[![NPM Version][npm-badge]][npm]
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]

This library is based off of the code from the [React Router v4 Docs](https://reacttraining.com/react-router/web/example/auth-workflow). The purpose of this library is to make it easy to handle redirecting users for routes that require the user to either be authenticated or unauthenticated.

## Install

```bash
npm install --save react-router-auth

OR

yarn add react-router-auth
```

## Usage

### AuthRoute

Use this component if you have a route that requires the user to be authenticated for them to be able to access it.

e.g. to access user profile page

```jsx
import React, { Component } from 'react'
import { AuthRoute } from 'react-router-auth'
import UserProfile from './UserProfile'

class Example extends Component {
  render () {
    return (
      <AuthRoute path="/profile" component={UserProfile} redirectTo="/login" authenticated={this.props.authenticated} />
    )
  }
}
```

In this example, if the user is authenticated while they try to access the `/profile` route, then the `UserProfile` component will be rendered. If the user is not authenticated then it will redirect them to the `/login` route.

#### Props

| Name          | Type            | Description                                            |
|---------------|-----------------|--------------------------------------------------------|
| authenticated | boolean         | Whether the user is authenticated or not               |
| redirectTo    | string          | The route to redirect the user to if not authenticated |
| component     | React Component | The component that requires authentication             |

### UnauthRoute

Use this component if you have a route that a user should only be able to access if they aren't already authenticated.

e.g. to access the login / signup pages

```jsx
import React, { Component } from 'react'
import { UnauthRoute } from 'react-router-auth'
import Login from './Login'

class Example extends Component {
  render () {
    return (
      <UnauthRoute path="/login" component={Login} redirectTo="/feed" authenticated={this.props.authenticated} />
    )
  }
}
```

In this example, if the user is authenticated while they try to access the `login` route, they will be redirected to the `/feed` route. If the user is not authenticated, then the `Login` component will be rendered.

#### Props

| Name          | Type            | Description                                        |
|---------------|-----------------|----------------------------------------------------|
| authenticated | boolean         | Whether the user is authenticated or not           |
| redirectTo    | string          | The route to redirect the user to if authenticated |
| component     | React Component | The component that requires authentication         |

### Usage with Redux

The easiest way to use these components with Redux is by creating your own components to wrap the components from this library with Redux's `connect` HOC and passing in `authenticated` as a prop.

Example:

```jsx
// ConnectedAuthRoute.js
import { connect } from 'react-redux'
import { AuthRoute } from 'react-router-auth'

const mapStateToProps = state => ({
  // In this example the auth reducer has a key
  // called authenticated which determines if the
  // user is authenticated or not
  authenticated: state.auth.authenticated, 
})

export default connect(mapStateToProps)(AuthRoute)
```

Now if you want to use this in any of your components, you don't need to pass in the authenticated prop as the component is already hooked up to determine the authenticated state from the Redux store.

```jsx
import React, { Component } from 'react'
import UserProfile from './UserProfile'
// Import our connected AuthRoute component
import ConnectedAuthRoute from './ConnectedAuthRoute'

class Example extends Component {
  render () {
    return (
      {/* we don't need to pass in the authenticated prop anymore */}
      <ConnectedAuthRoute path="/profile" component={UserProfile} redirectTo="/login" />
    )
  }
}
```

## License

MIT © [joelseq](https://twitter.com/joelseq03)

[build-badge]: https://img.shields.io/circleci/project/github/joelseq/react-router-auth.svg?style=flat-square
[build]: https://circleci.com/gh/joelseq/react-router-auth
[npm-badge]: https://img.shields.io/npm/v/react-router-auth.svg?style=flat-square
[npm]: https://www.npmjs.com/package/react-router-auth
[coverage-badge]: https://img.shields.io/codecov/c/github/joelseq/react-router-auth.svg?style=flat-square
[coverage]: https://codecov.io/github/joelseq/react-router-auth
