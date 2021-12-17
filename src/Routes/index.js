import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/postulant" exact component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Redirect to="/postulant" />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
