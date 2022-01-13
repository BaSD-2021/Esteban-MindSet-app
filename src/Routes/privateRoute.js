import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...props }) => {
  const role = useSelector((state) => state.auth.authenticated?.role);
  const isFetching = useSelector((state) => state.auth.isFetching);
  const error = useSelector((state) => state.auth.error);

  return (
    <Route
      {...props}
      render={(routeProps) => {
        if (isFetching) {
          return <></>;
        }
        if (role === props.role) {
          return <RouteComponent {...routeProps} />;
        }
        if (role && !error) {
          return <Redirect to={'/auth/notAllowed'} />;
        }
        return <Redirect to={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
