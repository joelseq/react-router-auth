import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const UnauthRoute = ({ component: Component, authenticated, redirectTo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        authenticated ? (
          <Redirect to={{
            pathname: redirectTo,
            state: { from: props.location }
          }}
          />
        ) : (
          <Component {...props} />
        )
      )}
    />
  )
}

UnauthRoute.propTypes = {
  authenticated: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
}

UnauthRoute.defaultProps = {
  authenticated: false,
}

export default UnauthRoute
