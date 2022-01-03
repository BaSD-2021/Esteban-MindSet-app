import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const MainHomeRoutes = lazy(() => import('Routes/mainHome'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/home" component={MainHomeRoutes} />
          <Route path="/postulant" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Redirect to={`/home`} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
