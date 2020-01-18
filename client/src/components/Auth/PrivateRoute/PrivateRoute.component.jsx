import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    isAuthenticated, loading,
    ...rest
  }) => (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }
    />)

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated,
    loading: auth.loading,
    user: auth.user,
});

export default connect(mapStateToProps)(PrivateRoute);