import { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/postulant" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/auth" component={AuthRoutes} />
          <Redirect to="/auth" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
