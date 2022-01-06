import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const AdminRoutes = lazy(() => import('Routes/admin'));
const PostulantRoutes = lazy(() => import('Routes/postulant'));
const PsychologistRoutes = lazy(() => import('Routes/psychologist'));

const Routes = () => {
  return (
    <Router>
      <Suspense fallback={<div />}>
        <Switch>
          <Route path="/postulant" component={PostulantRoutes} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/psychologist" component={PsychologistRoutes} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Routes;
