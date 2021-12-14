import AdminRoutes from 'Routes/admin';
import PostulantRoutes from 'Routes/postulant';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/postulant" exact component={PostulantRoutes} />
        <Route path="/admin" component={AdminRoutes} />
        <Redirect to="/postulant" />
      </Switch>
    </Router>
  );
};

export default Routes;
