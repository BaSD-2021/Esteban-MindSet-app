import AdminRoutes from 'Routes/admin';
import PostulantRoutes from 'Routes/postulant';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={PostulantRoutes} />
        <Route path="/admins" component={AdminRoutes} />
      </Switch>
    </Router>
  );
};

export default Routes;
