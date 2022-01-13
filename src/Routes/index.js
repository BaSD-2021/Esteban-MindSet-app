import { lazy, Suspense, useEffect } from 'react';
import { Switch, BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import PrivateRoute from './privateRoute';
import { useSelector } from 'react-redux';
import { getMe } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const AuthRoutes = lazy(() => import('Routes/auth'));
const PsychologistRoutes = lazy(() => import('Routes/psychologist'));
const MainHomeRoutes = lazy(() => import('Routes/mainHome'));

const Routes = () => {
  const token = useSelector((store) => store.auth.authenticated?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token]);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/home" component={MainHomeRoutes} />
          <PrivateRoute path="/postulant" role="POSTULANT" component={PostulantRoutes} />
          <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
          <PrivateRoute path="/psychologist" role="PSYCHOLOGIST" component={PsychologistRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/home" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
