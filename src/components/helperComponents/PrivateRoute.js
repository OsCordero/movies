import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavBar from './../NavBar/NavBar';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('authToken') ? (
          <>
            <NavBar /> <Component {...props} />
          </>
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
